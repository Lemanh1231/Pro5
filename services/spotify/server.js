const http = require('node:http');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = Number(process.env.PORT || 3001);
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

let accessToken = '';
let accessTokenExpiresAt = 0;
let rateLimitedUntil = 0;
let spotifyCache = null;
let spotifyCacheExpiresAt = 0;
let spotifyCacheInFlight = null;
let lastErrorLogAt = 0;
let cachedError = null;
function logError(error) {
  if (Date.now() - lastErrorLogAt < 60000) return;
  lastErrorLogAt = Date.now();
  console.error(`[spotify-api] ${error.message}`);
}

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

function trackPayload(item, extra = {}) {
  if (!item) return { isPlaying: false, ...extra };
  return {
    ...extra,
    song: item.name || '',
    artist: Array.isArray(item.artists) ? item.artists.map((artist) => artist.name).join('; ') : '',
    album: item.album?.name || '',
    album_art_url: item.album?.images?.[0]?.url || '',
  };
}

async function refreshAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Spotify credentials are not configured');
  }
  const response = await fetch('https://accounts.spotify.com/api/token', {
    signal: AbortSignal.timeout(10000),
    method: 'POST',
    headers: {
      authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: REFRESH_TOKEN }),
  });
  if (!response.ok) throw new Error(`Spotify token request failed: ${response.status}`);
  const data = await response.json();
  accessToken = data.access_token;
  accessTokenExpiresAt = Date.now() + Math.max(30, Number(data.expires_in || 3600) - 60) * 1000;
  return accessToken;
}

async function getAccessToken(force = false) {
  if (!force && accessToken && Date.now() < accessTokenExpiresAt) return accessToken;
  return refreshAccessToken();
}

async function getCurrentlyPlaying(forceRefresh = false) {
  if (Date.now() < rateLimitedUntil) {
    return { status: 429, ok: false, headers: new Map([['retry-after', '60']]) };
  }
  const token = await getAccessToken(forceRefresh);
  const resp = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    signal: AbortSignal.timeout(10000),
    headers: { authorization: `Bearer ${token}` },
  });
  if (resp.status === 429) {
    const retryValue = Number(resp.headers.get('retry-after'));
    const retrySec = Number.isFinite(retryValue) && retryValue > 0 ? retryValue : 60;
    rateLimitedUntil = Date.now() + (retrySec * 1000);
    console.warn(`[spotify-api] currently-playing 429. Pausing currently-playing calls for ${retrySec}s`);
  }
  return resp;
}

async function fetchSpotifyStatus() {
  if (Date.now() < rateLimitedUntil) {
    return { isPlaying: false, rateLimited: true };
  }
  let current = await getCurrentlyPlaying();
  if (current.status === 401) current = await getCurrentlyPlaying(true);

  if (current.status === 200) {
    const data = await current.json();
    if (data.is_playing && data.item) {
      const now = Date.now();
      return trackPayload(data.item, {
        isPlaying: true,
        timestamps: {
          start: now - Number(data.progress_ms || 0),
          end: now - Number(data.progress_ms || 0) + Number(data.item.duration_ms || 0),
        },
      });
    }
  } else if (current.status !== 204 && current.status !== 429) {
    throw new Error(`Spotify currently-playing failed: ${current.status}`);
  }

  return { isPlaying: false };
}

async function getCachedSpotifyStatus() {
  if (cachedError && Date.now() < spotifyCacheExpiresAt) throw cachedError;
  if (spotifyCache && Date.now() < spotifyCacheExpiresAt) return spotifyCache;
  if (spotifyCacheInFlight) return spotifyCacheInFlight;
  spotifyCacheInFlight = fetchSpotifyStatus()
    .then((payload) => {
      cachedError = null;
      spotifyCache = payload;
      spotifyCacheExpiresAt = Date.now() + 5000;
      return payload;
    })
    .catch((error) => {
      cachedError = error;
      spotifyCache = null;
      spotifyCacheExpiresAt = Date.now() + 10000;
      throw error;
    })
    .finally(() => {
      spotifyCacheInFlight = null;
    });
  return spotifyCacheInFlight;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);
  if (req.method !== 'GET' || url.pathname !== '/api/spotify') {
    return json(res, 404, { error: 'Not found' });
  }
  try {
    return json(res, 200, await getCachedSpotifyStatus());
  } catch (error) {
    logError(error);
    return json(res, 502, { isPlaying: false, error: 'Spotify API unavailable' });
  }
});

const webSocketServer = new WebSocketServer({ noServer: true, maxPayload: 1024, perMessageDeflate: false });
const clients = new Set();
let lastBroadcastSignature = '';
let lastWasPlaying = false;
let pausedAt = 0;
let nullBroadcasted = false;

function broadcast(payload) {
  const message = JSON.stringify(payload);
  for (const client of clients) {
    if (client.bufferedAmount > 65536) client.terminate();
    else if (client.readyState === WebSocket.OPEN) client.send(message);
  }
}

function statusSignature(payload) {
  if (!payload?.isPlaying) return 'paused';
  return [
    payload.song,
    payload.artist,
    payload.album,
    Math.round(Number(payload.timestamps?.start || 0) / 5000),
  ].join('|');
}

async function monitorSpotify() {
  if (clients.size === 0) return;
  try {
    const payload = await getCachedSpotifyStatus();
    if (payload.isPlaying) {
      const signature = statusSignature(payload);
      if (!lastWasPlaying || signature !== lastBroadcastSignature) {
        broadcast(payload);
        lastBroadcastSignature = signature;
      }
      lastWasPlaying = true;
      pausedAt = 0;
      nullBroadcasted = false;
      return;
    }

    if (lastWasPlaying || lastBroadcastSignature !== 'paused') {
      broadcast({ isPlaying: false });
      lastBroadcastSignature = 'paused';
      pausedAt = Date.now();
      nullBroadcasted = false;
    } else if (pausedAt && !nullBroadcasted && Date.now() - pausedAt >= 60000) {
      broadcast(null);
      nullBroadcasted = true;
    }
    lastWasPlaying = false;
  } catch (error) {
    logError(error);
  }
}

server.on('upgrade', (request, socket, head) => {
  const url = new URL(request.url, `http://${request.headers.host || '127.0.0.1'}`);
  if (url.pathname !== '/ws/spotify' || clients.size >= 100) {
    socket.destroy();
    return;
  }
  webSocketServer.handleUpgrade(request, socket, head, (client) => {
    clients.add(client);
    client.isAlive = true;
    client.on('pong', () => { client.isAlive = true; });
    client.on('close', () => clients.delete(client));
    client.on('error', () => clients.delete(client));
    getCachedSpotifyStatus().then((payload) => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(payload));
    }).catch(() => {
      if (client.readyState === WebSocket.OPEN) client.send(JSON.stringify(null));
    });
  });
});

setInterval(() => {
  for (const client of clients) {
    if (!client.isAlive) { client.terminate(); continue; }
    client.isAlive = false;
    client.ping();
  }
}, 30000).unref();

server.maxConnections = 150;
server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[spotify-api] listening on 127.0.0.1:${PORT}`);
  monitorSpotify();
  setInterval(monitorSpotify, 10000);
});

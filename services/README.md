# Optional realtime services for Pro5

Branch `lanyard` contains the profile frontend plus the supporting Lanyard and
Spotify status code. The `main` branch remains frontend-only. These are sanitized
source copies; creating this branch does not reconfigure production services.

## Lanyard / Discord

```sh
cd services/lanyard
cp .env.example .env
# Fill BOT_TOKEN and MONITORED_USER_ID locally; never commit .env.
docker compose -f compose.yaml up -d --build
```

Requires Docker Compose. Preserve the upstream LICENSE and attribution; see
UPSTREAM-README.md for Discord bot setup and API protocol. Set EXTERNAL_URL to
your own HTTPS origin. Do not publish Redis ports or expose bot tokens.

## Spotify realtime

Requires Node.js 20+ (native fetch, AbortSignal.timeout).

```sh
cd services/spotify
cp .env.example .env
# Fill your own Spotify credentials locally.
npm ci
node --env-file=.env server.js
```

Supply a Spotify refresh token with permission to read currently playing state
(`user-read-currently-playing`). Obtain it using Spotify's official OAuth flow;
no live token or token-generation helper is included. The server binds to
127.0.0.1:3001 and provides `/api/spotify` and `/ws/spotify` for the frontend.

## Reverse proxy example

Add to your existing HTTPS virtual host, not as a replacement for its config:

```nginx
location = /api/spotify {
    proxy_pass http://127.0.0.1:3001;
}
location = /ws/spotify {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 75s;
}
location /v1/ {
    proxy_pass http://127.0.0.1:4001;
}
location = /socket {
    proxy_pass http://127.0.0.1:4001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 75s;
}
```

The bot/public-status backend and Lavalink web are NOT included. Add suitable
rate limits, TLS and access controls for your environment. These sample files
contain no host-specific credentials, database dumps, logs or production env.

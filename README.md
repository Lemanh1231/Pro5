# Pro5 — Shittim Chest Profile

Static profile website with a Plana terminal, activity panels and local music player.

## Quick start

Requires Python 3. From a clone:

```sh
bash tools/serve.sh
```

Open http://127.0.0.1:8080. No npm installation is required.

## Deployment

Requires Node.js (syntax validation), rsync and permission to write the destination.

```sh
sudo bash tools/deploy.sh
# Or choose another document root:
sudo WEB_ROOT=/var/www/example bash tools/deploy.sh
```

Default production directory: `/var/www/kotori.click`. The source workspace
does not need to be there or under `/root`. Deployment does not delete existing
files and does not deploy Lavalink or preview applications. Keep relative
compatibility symlinks: they preserve existing asset URLs.

## Optional integrations

Live Discord/Spotify/bot status requires same-origin backend proxies. This repo
contains only browser-side clients, no API servers, credentials or server config.
Frontend route names are public by design, not API keys. Static preview does not
provide those endpoints. The Lavalink dashboard is not included.

## Music and assets

Site artwork is included. Audio/originals and generated playlists are excluded
by default. Provide audio in `media/music-source/songs/` and covers in `images/`,
then run `python3 tools/music-sync.py` (requires FFmpeg/ffprobe). To publish to
production, set `MUSIC_PUBLIC=/var/www/kotori.click/data/music`.
MUSIC_SOURCE can override the originals directory. Only publish artwork/audio
you have permission to redistribute.

## Security scope

No backend source, host configuration, secrets, private originals, backups or
test/preview applications are intended to be tracked. Keep credentials on the
server; never embed them in browser JavaScript. Personal profile links and public
Discord IDs are part of the displayed profile.

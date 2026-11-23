#!/usr/bin/env bash
set -euo pipefail
workspace="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
target="${WEB_ROOT:-/var/www/kotori.click}"
if [[ "$target" != /* || "$target" == / || "$target" == "$workspace" || "$target" == "$workspace/public" ]]; then
  echo "Unsafe WEB_ROOT: $target" >&2
  exit 1
fi
if mountpoint -q "$target"; then
  echo "Refusing to deploy into a mount point: $target" >&2
  exit 1
fi
node --check "$workspace/public/assets/js/script.js"
mkdir -p -- "$target"
# Never delete live uploads/generated music, and preserve relative URL symlinks.
rsync -rlt --safe-links --chmod=D755,F644 --exclude='.gitkeep' --exclude='/apps/' --exclude='/lavalink-status' --exclude='/gg-studio-preview-01' "$workspace/public/" "$target/"
echo "Deployed to $target (no service restart, no file deletion)."

#!/usr/bin/env bash
set -euo pipefail
workspace="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
exec python3 -m http.server "${PORT:-8080}" --bind "${HOST:-127.0.0.1}" --directory "$workspace/public"

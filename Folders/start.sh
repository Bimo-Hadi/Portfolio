#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
PORT=8080
if command -v python3 >/dev/null 2>&1; then PY=python3
elif command -v python >/dev/null 2>&1; then PY=python
else
  echo "Python tidak ditemukan. Buka index.html langsung di browser."; exit 0
fi
echo "Server berjalan di http://localhost:$PORT  (Ctrl+C untuk berhenti)"
( sleep 1; (xdg-open "http://localhost:$PORT" || open "http://localhost:$PORT") >/dev/null 2>&1 ) &
exec $PY -m http.server $PORT

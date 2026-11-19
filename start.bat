@echo off
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (
  echo Server berjalan di http://localhost:8080  (tekan Ctrl+C untuk berhenti)
  start "" http://localhost:8080
  python -m http.server 8080
) else (
  echo Python tidak ditemukan. Membuka index.html langsung...
  start "" "%~dp0index.html"
)

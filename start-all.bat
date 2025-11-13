@echo off
echo ========================================
echo Starting XSS Demo Environment
echo ========================================
echo.

:: Installiere npm dependencies falls nicht vorhanden
if not exist "attacker-server\node_modules" (
    echo Installing Node.js dependencies...
    cd attacker-server
    call npm install
    cd ..
    echo.
)

:: Starte beide Server in separaten Fenstern
echo Starting Python Web Server (Port 8000)...
start "Python Web Server" cmd /k "cd src && python -m http.server 8000"

timeout /t 2 /nobreak >nul

echo Starting Attacker Server (Port 3000)...
start "Attacker Server" cmd /k "cd attacker-server && npm start"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo Servers are starting...
echo ========================================
echo.
echo XSS Webseite:        http://localhost:8080
echo Attacker Dashboard:  http://localhost:3000/dashboard
echo.
echo Press any key to open Dashboard in browser...
pause >nul

start http://localhost:3000/dashboard

echo.
echo To stop servers: Close the server windows
echo.

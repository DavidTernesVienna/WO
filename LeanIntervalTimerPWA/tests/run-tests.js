import http from 'http';
import fs from 'fs';
import path from 'path';
import { launch } from 'puppeteer';

const BASE = process.env.BASE_URL || '/';

function createServer() {
  const dist = path.resolve('dist');
  return http.createServer((req, res) => {
    const cut = BASE.length > 1 ? BASE.length - 1 : 0;
    const urlPath = req.url.startsWith(BASE) ? req.url.slice(cut) : req.url;
    const filePath = path.join(dist, urlPath === '/' ? '/index.html' : urlPath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('not found');
        return;
      }
      const ext = path.extname(filePath).slice(1);
      const map = {html:'text/html', js:'application/javascript', json:'application/json', png:'image/png'};
      res.writeHead(200, {'Content-Type': map[ext] || 'text/plain'});
      res.end(data);
    });
  });
}

async function run() {
  const server = createServer().listen(3000);
  const browser = await launch({headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (!/Failed to load resource/.test(text)) {
        errors.push(text);
      }
    }
  });
  await page.goto(`http://localhost:3000${BASE}index.html`, {waitUntil: 'networkidle0'});
  await page.$eval('h1', el => el.textContent.includes('Lean Interval Timer'));
  await page.click('#oneClick');
  await new Promise(r => setTimeout(r, 500));
  await page.click('#oneClick');
  await page.setOfflineMode(true);
  await page.reload({waitUntil: 'networkidle0'});
  await browser.close();
  server.close();
  if (errors.length) {
    console.error('Console errors:', errors);
    process.exit(1);
  } else {
    console.log('No console errors.');
  }
}

run();

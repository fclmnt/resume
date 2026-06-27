// Generate ATS-safe PDFs for both languages from the built /print routes.
// Usage: npm run build && npm run pdf
// Requires: npx playwright install chromium (first run only)

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { readFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const BASE = '/resume';
const PORT = 4319;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml',
};

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.startsWith(BASE)) p = p.slice(BASE.length);
    if (p.endsWith('/')) p += 'index.html';
    if (!extname(p)) p += '/index.html';
    const data = await readFile(join(DIST, p));
    res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404); res.end('not found');
  }
});

await new Promise((r) => server.listen(PORT, r));

const browser = await chromium.launch();
const page = await browser.newPage();

for (const lang of ['en', 'fr']) {
  const url = `http://localhost:${PORT}${BASE}/${lang}/print/`;
  await page.goto(url, { waitUntil: 'networkidle' });
  const out = join(__dirname, '..', `franck_clement_resume_${lang}.pdf`);
  await page.pdf({
    path: out,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
  });
  console.log(`✓ ${out}`);
}

await browser.close();
server.close();

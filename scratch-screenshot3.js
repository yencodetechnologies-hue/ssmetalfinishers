const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  for (const p of ['about.html', 'services.html', 'gallery.html', 'contact.html']) {
    await page.goto(`http://localhost:8081/${p}`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `scratch-shot-${p}.png` });
  }
  console.log('CONSOLE ERRORS:', JSON.stringify(errors, null, 2));
  await browser.close();
})();

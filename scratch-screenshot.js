const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

  await page.goto('http://localhost:8081/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scratch-screenshot-home.png', fullPage: false });
  await page.screenshot({ path: 'scratch-screenshot-home-full.png', fullPage: true });

  console.log('CONSOLE ERRORS:', JSON.stringify(errors, null, 2));
  console.log('TITLE:', await page.title());

  await browser.close();
})();

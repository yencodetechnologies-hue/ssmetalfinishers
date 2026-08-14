const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:8081/index.html', { waitUntil: 'networkidle' });

  // Scroll through the page in steps to trigger any scroll/IntersectionObserver reveals
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 800) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(500);

  await page.screenshot({ path: 'scratch-screenshot-home-full2.png', fullPage: true });
  console.log('done');
  await browser.close();
})();

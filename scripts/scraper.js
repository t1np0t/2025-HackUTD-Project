import puppeteer from 'puppeteer';
import fs from 'fs';

const url = 'https://www.toyota.com/all-vehicles';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.waitForSelector('div.vehicle-cards-wrapper', { timeout: 60000 });

  const vehicles = await page.evaluate(() => {
    const container = document.querySelector('div.vehicle-cards-wrapper');
    if (!container) return [];

    const cards = container.querySelectorAll('.vehicle-card');
    const data = [];

    cards.forEach(card => {
      const year = card.getAttribute('data-year') || null;
      const name = card.getAttribute('data-display-name') || null;
      const price = card.getAttribute('data-aa-series-msrp') || null;
      const seatCount = card.getAttribute('data-seating') || null;
      const combinedMpg = card.getAttribute('data-combinedmpg') || null;
      const vehicleImage = card.getAttribute('data-jelly') || null;
      const vehicleType = card.getAttribute('data-category') || null;

      data.push({year, name, price, seatCount, combinedMpg, vehicleImage, vehicleType});
    });

    return data;
  });

  console.log(`Found ${vehicles.length} vehicles:`);
  console.log(JSON.stringify(vehicles, null, 2));

  // Save to file
  fs.writeFileSync('./scripts/vehicleData.json', JSON.stringify(vehicles, null, 2));
  await browser.close();
})();


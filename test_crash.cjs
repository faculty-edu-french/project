const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR LOG:', msg.text());
    }
  });
  
  page.on('pageerror', error => {
    console.log('PAGE EXCEPTION:', error.message);
  });

  await page.goto('http://localhost:5173/project/');
  
  // Wait for sidebar to load
  await page.waitForSelector('button');
  
  // Find the button with text "Module 1"
  const buttons = await page.$$('button');
  for (let b of buttons) {
    const text = await page.evaluate(el => el.textContent, b);
    if (text.includes('Module 1')) {
      await b.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Find "Le covoiturage"
  const links = await page.$$('button, a, div');
  for (let l of links) {
    const text = await page.evaluate(el => el.textContent, l);
    if (text === 'Le covoiturage') {
      await l.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();

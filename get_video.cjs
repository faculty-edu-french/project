const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('response', response => {
    const url = response.url();
    if (url.includes('.mp4') || url.includes('.m3u8') || url.includes('vimeo') || url.includes('youtube')) {
      console.log('Media URL found:', url);
    }
  });

  await page.goto('https://toutenfrancais.tv/fle-covoiturage-a2', { waitUntil: 'networkidle2' });
  
  // Also look for iframes
  const frames = page.frames();
  for (let frame of frames) {
    console.log('Frame URL:', frame.url());
  }
  
  // Also dump any video tags
  const videos = await page.$$eval('video', els => els.map(el => el.src));
  console.log('Video tags:', videos);

  await browser.close();
})();

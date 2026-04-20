const Tesseract = require('tesseract.js');
const files = ['public/images/m3_lecon1_1.png', 'public/images/m3_lecon1_2.png', 'public/images/m3_lecon1_3.png'];

async function run() {
  for (let file of files) {
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng', { logger: () => {} });
      if (text.toLowerCase().includes('vectorstock')) {
         console.log('FOUND IN', file);
      }
      console.log(`[${file}] text: ${text.substring(0, 50)}...`);
    } catch (e) {
      console.error(e);
    }
  }
}
run();

const puppeteer = require('puppeteer');  
(async () => {  
  const browser = await puppeteer.launch({ headless: 'new', executablePath: 'C:\\Users\\CB\\.cache\\puppeteer\\chrome\\win64-150.0.7871.24\\chrome-win64\\chrome.exe' });  
  const page = await browser.newPage();  
  page.on('console', msg => { if (msg.type() === 'error') console.log('PAGE LOG:', msg.text()); });  
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));  
  await page.goto('http://localhost:3000/lms', { waitUntil: 'networkidle2' }).catch(e => console.log('Nav err', e));  
  await browser.close();  
})();  

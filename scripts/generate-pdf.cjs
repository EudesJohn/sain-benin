const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, '..', 'docs', 'manuel-admin-sain.html');
  console.log('Loading:', htmlPath);
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });

  const pdfPath = path.resolve(__dirname, '..', 'docs', 'manuel-admin-sain.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '25mm', left: '18mm', right: '18mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:8pt;color:#888;padding:0 20mm;">SAIN — Manuel d\'Administration &nbsp;|&nbsp; Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
  });

  console.log('PDF generated successfully at:', pdfPath);
  await browser.close();
})();

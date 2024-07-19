const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        devtools: false,
        slowMo: 5,
        defaultViewport: null,
        args:['--start-maximized']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 0, height: 0});

    await page.setRequestInterception(true)
    page.on('request', (request) => {
        if (request.url().includes('&sd=')) {
            console.log(">> ", request.method(), request.url())
        }
        request.continue()
    })
    page.on('response', (response) => {
        //console.log('<< ', response.status(), response.url())
    })

    page.setUserAgent('zx.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Safari/537.36')
    await page.goto('http://127.0.0.1:8080/testPageBareBones.html', {waitUntil: 'networkidle2'});
    //await page.goto('http://localhost:5173/')
    //await browser.close()
})();
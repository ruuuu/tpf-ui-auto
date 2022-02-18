import playwright from 'playwright';

let browser;
let context;
let page;

const { chromium, webkit, firefox } = require('playwright');
const browserName = process.env.BROWSER; //|| 'webkit';

async function goto(url) {
    await page.goto(url);
    return page;
}

async function run() {
    browser = await playwright.chromium.launch({
        headless: false, // true скрываем  бразуер
        slowMo: 3000,
    });

    context = await browser.newContext();
    page = await context.newPage();

    // Задать разрешение
    // await page.setViewportSize({
    //   width: 1280,
    //   height: 720,
    // });
}

async function stop() {
    await page.screenshot({
        path: 'exampleFailed.jpg'
    });
    await page.close();
    await browser.close();
}

export { goto, run, stop };
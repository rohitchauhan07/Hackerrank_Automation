// node 1_HackerrankAutomation_REP.js --url=https://www.hackerrank.com/ --config=config_REP.json

// npm init -y
// npm install minimist
// npm install puppeteer

let minimist = require("minimist");
let puppeteer = require("puppeteer");
let fs = require("fs");

let args = minimist(process.argv);

let configJSON = fs.readFileSync(args.config, "utf-8");
let config = JSON.parse(configJSON);

async function run(){
    let browser = await puppeteer.launch({
        headless:false,
        args: [
            '--start-maximized'
        ],
        defaultViewport: null
    });

    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);

    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");

    await page.waitForSelector("a[href='https://www.hackerrank.com/login']");
    await page.click("a[href='https://www.hackerrank.com/login']");

    await page.waitForSelector("input[name='username']");
    await page.type("input[name='username']", config.userid, {delay:50}); // userid from config file

    await page.waitForSelector("input[name='password']");
    await page.type("input[name='password']", config.password, {delay:50}); // password from config file

    await page.waitForSelector("button[data-analytics='LoginPassword']");
    await page.click("button[data-analytics='LoginPassword']");

    await page.waitForSelector("a[href='/contests']");
    await page.click("a[href='/contests']");

    await page.waitForSelector("a[href='/administration/contests/']");
    await page.click("a[href='/administration/contests/']");

    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

    await page.waitFor(3000);

    await page.waitForSelector("li[data-tab='moderators']");
    await page.click("li[data-tab='moderators']");

    await page.waitForSelector("input[id='moderator']");
    await page.type("input[id='moderator']", config.moderator, {delay:50});

    await page.keyboard.press("Enter");

    




}

run();
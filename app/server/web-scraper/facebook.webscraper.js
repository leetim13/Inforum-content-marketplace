const BaseWebScrapper = require('./base.webscraper');
const puppeteer = require('puppeteer');
const redis = require("redis");
const { promisify } = require('util');
const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
}) : redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);
const Logger = require('@logdna/logger');
var options = {
    app: "inforum-server",
    env: process.env.SERVER_ENV,
    tags: ['logging', 'nodejs', 'logdna'] // Tags can also be provided in comma-separated string format: 'logging,nodejs,logdna'    
};

const logger = Logger.createLogger("d2cb803c286659fcd0027047019553ae", options);

/**
 * @class FacebookWebScrapper
 * @extends {BaseWebScrapper}
 */
class FacebookWebScrapper extends BaseWebScrapper{
    constructor() {
        super("facebook");
        this.getPost = this.getPost.bind(this);
        logger.info("FB Scrapper started.");
    }

    async getBrowser(headless=true) {
        let args;
        if (headless) {
            args = ['--no-sandbox','--disable-setuid-sandbox'];
        } else {
            args = [];
        }
        const browser = await puppeteer.launch({ headless, timeout: this.timeout, devtools: true, args});
        const context = browser.defaultBrowserContext();
        context.overridePermissions('https://www.facebook.com', []);
        return browser;
    }

    async getPage(browser) {
        const page = await browser.newPage();
        page.setDefaultTimeout(this.timeout);
        const client = await page.target().createCDPSession();
        await client.send('Fetch.enable', {
            patterns: [{ urlPattern: "https://www.facebook.com/login/device-based/regular/login/*", requestStage: "Response" }]
          });
        client.on("Fetch.requestPaused", async event => {
            const { requestId, request } = event;
            const cookieStrings = request.headers.Cookie.split('; ');
            if (cookieStrings.length === 0) {
                throw new Error("Facebook cookies not found.");
            }
            const FacebookCookies = [];
            cookieStrings.forEach(cookie => {
                const nameValue = cookie.split('=');
                FacebookCookies.push({ 
                    name: nameValue[0], 
                    value: nameValue[1], 
                    domain: ".facebook.com",
                    path: '/', 
                    httpOnly: nameValue[0] === "wd" ? false : true, 
                    secure: true,
                    session: false, 
                    sameSite: 'None',
                    sameParty: false,
                    sourceScheme: 'Secure',
                    sourcePort: 443
                });
            })
            await setAsync(`${this.platform}_cookies`, JSON.stringify(FacebookCookies, null, 2));
            await client.send("Fetch.continueRequest", { requestId });
        });
        return page;
    }

    async loginWithCredentials(page, url) {
        console.log("Log in via credentials");
        logger.info("Log in via credentials");
        await page.goto(url);
        await page.waitForSelector('#email')
        .catch(err => console.log(err.message));
        await page.type('#email', this.username);
        await page.type('#pass', this.password);
        await page.click('#loginbutton');
        // await page.waitForNavigation({waitUntil: 'networkidle0'});
    }

    async loginWithCookies(page, url, cookies) {
        console.log("Log in via cookies");
        logger.info("Log in via credentials");
        const jsonCookies = JSON.parse(cookies);
        await page.setCookie(...jsonCookies);
        // await page.goto(url, { waitUntil: 'networkidle0' });
        await page.goto(url);
        // If login button is found, meaning not logged in. (Cookies expired, etc)
        if (await page.$('#loginbutton') !== null) {
            await this.loginWithCredentials(page, url);
            if (await page.$('#loginbutton') !== null) {
                throw new Error("Log in failed.");
            }
        }
    }

    // TODO: Post with no likes will error can't find like amount.
    async getPost(url) {
        console.log(url);
        const browser = await this.getBrowser(true);
        const page = await this.getPage(browser);

        const cookies = await getAsync(`${this.platform}_cookies`);
        let postMessageDiv = 'div.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q';
        let likesDiv = 'span.gpro0wi8.pcp91wgn'
        if (!cookies) {
            await this.loginWithCredentials(page, url);
        } else {
            await this.loginWithCookies(page, url, cookies);
        }
        console.log("logged in.");
        logger.info("logged in.");
        // Waits for the comment bar to show up,
        // Use to indicate that the post has been loaded.
        await page.waitForSelector(postMessageDiv)
        .catch(_=> {
            throw new Error("Post verification failed. Post not visible or link does not exist.");
        })

        console.log("Message showed");
        logger.info("Message showed");
        // Gets the post text
        const messages = await page.$$eval(postMessageDiv, (nodes) => nodes.map((n) => n.innerText), postMessageDiv);
        const likes = await page.$$eval(likesDiv, (nodes) => nodes.map((n) => n.innerText), likesDiv);
        const message = messages.join(" ");
        logger.info({ message: message, likes: (isNaN(parseInt(likes[0])) ? 0 : parseInt(likes[0])) });
        return { message: message, likes: (isNaN(parseInt(likes[0])) ? 0 : parseInt(likes[0])) };
    }
}

module.exports = FacebookWebScrapper;
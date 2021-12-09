const BaseWebScraper = require('./base.webscraper');
const puppeteer = require('puppeteer');
const redis = require("redis");
const { promisify } = require('util');
const logger = require("../helpers/logger");


/**
 * @class FacebookWebScraper
 * @extends {BaseWebScraper}
 */
class FacebookWebScraper extends BaseWebScraper{
    constructor() {
        super("facebook");
        this.getPost = this.getPost.bind(this);
        this.username = process.env.FACEBOOK_USERNAME || require("../config/localConfig.json")[this.platform].username;
        this.password = process.env.FACEBOOK_PASSWORD || require("../config/localConfig.json")[this.platform].password;
        logger.info("FB Scrapper started.");

        
        this.redis = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL, {
            tls: {
                rejectUnauthorized: false
            }
        }) : redis.createClient();
        this.setAsync = promisify(this.redis.set).bind(this.redis);
        this.getAsync = promisify(this.redis.get).bind(this.redis);
        logger.info(`Redis connected successfully at ${process.env.REDIS_URL || "local:6379"}`);
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
                logger.error("Facebook cookies not found.");
                this.redis.quit();
                logger.info(`Redis client disconnected.`);
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
            await this.setAsync(`${this.platform}_cookies`, JSON.stringify(FacebookCookies, null, 2));
            await client.send("Fetch.continueRequest", { requestId });
        });
        return page;
    }

    async loginWithCredentials(page, url) {
        console.log("Log in via credentials");
        logger.info("Log in via credentials");
        await page.goto(url);
        await page.waitForSelector('#email')
        .catch(err => logger.error(err.message));
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
                logger.error("Log in failed.");
                this.redis.quit();
                logger.info(`Redis client disconnected.`);
                throw new Error("Log in failed.");
            }
        }
    }

    async getPost(url) {
        logger.info(`Scraping ${url}... In progress`);
        const browser = await this.getBrowser(process.env.SERVER_ENV ? true : false);
        const page = await this.getPage(browser);
        
        const cookies = await this.getAsync(`${this.platform}_cookies`);
        let postMessageDiv = 'div.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q';
        let likesDiv = 'span.gpro0wi8.pcp91wgn'
        if (!cookies) {
            await this.loginWithCredentials(page, url);
        } else {
            await this.loginWithCookies(page, url, cookies);
        }
        this.redis.quit();
        logger.info(`Redis client disconnected.`);
        logger.info("logged in.");
        // Waits for the comment bar to show up,
        // Use to indicate that the post has been loaded.
        await page.waitForSelector(postMessageDiv)
        .catch(e => {
            logger.error(e.message);
            throw new Error("Post verification failed. Post not visible or link does not exist.");
        })
        logger.info("Message showed");
        // Gets the post text
        const messages = await page.$$eval(postMessageDiv, (nodes) => nodes.map((n) => n.innerText), postMessageDiv);
        const likes = await page.$$eval(likesDiv, (nodes) => nodes.map((n) => n.innerText), likesDiv);
        const message = messages.join(" ");
        
        logger.info(`Scraping ${url}... Completed`);
        logger.info({ message: message, likes: (isNaN(parseInt(likes[0])) ? 0 : parseInt(likes[0])) });
        
        return { message: message, likes: (isNaN(parseInt(likes[0])) ? 0 : parseInt(likes[0])) };
    }
}

module.exports = FacebookWebScraper;
const BaseWebScrapper = require('./base.webscraper');
const puppeteer = require('puppeteer');
const FacebookPass = process.env.FACEBOOK_PASSWORD || "inforumToTheMoon";
const redis = require("redis");
const { promisify } = require('util');
const client = process.env.REDIS_URL ? redis.createClient(process.env.REDIS_URL, {
    tls: {
        rejectUnauthorized: false
    }
}) : redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

/**
 * @class FacebookWebScrapper
 * @extends {BaseWebScrapper}
 */
class FacebookWebScrapper extends BaseWebScrapper{
    constructor() {
        super("Facebook");
        this.getPost = this.getPost.bind(this);
        this.platformUrl = 'https://www.facebook.com';
        this.timeout = 5000;
    }

    async getBrowser(headless=true) {
        const browser = await puppeteer.launch({ headless, timeout: this.timeout, devtools: true });
        const context = browser.defaultBrowserContext();
        context.overridePermissions(this.platformUrl, []);
        return browser;
    }

    async getPage(browser) {
        const page = await browser.newPage();
        page.setDefaultTimeout(this.timeout);
        return page;
    }

    async loginWithCredentials(browser, url) {
        const page = await this.getPage(browser);
        await page.goto(url);
        console.log("Log in via credentials");
        await page.waitForSelector('#email')
        .catch(err => console.log(err.message));
        await page.type('#email', 'inforumProd@gmail.com');
        await page.type('#pass', "inforumToTheMoon");

        // Remove cookie policy banner, if exists
        if (await page.$('div[data-testid="cookie-policy-banner]') !== null) {
            console.log('Facebook cookie banner found');
            await page.evaluate((selector) => {
                const elements = document.querySelectorAll(selector);
                for (let i = 0; i < elements.length; i += 1) {
                    elements[i].parentNode.removeChild(elements[i]);
                }
            });
        }

        await page.click('#loginbutton')
        .catch(async _ => {
            await page.click('input[type="submit"]');
        })
        .catch(_ => {
            reject("Facebook login failed.");
        });
        var data = await page._client.send('Network.getAllCookies');
        console.log(data);
        await page.cookies()
        .then(async (freshCookies) => {
            console.log(freshCookies);
            await setAsync("facebook_cookie", JSON.stringify(freshCookies, null, 2));
        })
        await page.close();
        await browser.close();
    }

    async getPost(req, res) {
        const url = req.query.url;
        const text = req.query.text;
        // await this.setCookies(url);
        const browser = await this.getBrowser(false);
        const page = await this.getPage(browser);
        const client = await page.target().createCDPSession();
        await client.send('Fetch.enable', {
            patterns: [{ urlPattern: "https://www.facebook.com/login/device-based/regular/login/*", requestStage: "Response" }]
          });
        client.on("Fetch.requestPaused", async event => {
            const { requestId, request } = event;
            console.log(request["headers"]);
            console.log(request.headers.Cookie);
            const cookieStrings = request.headers.Cookie.split('; ');
            if (cookieStrings.length === 0) {
                throw new Error("Facebook cookies not found");
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
            await setAsync("facebook_cookies", JSON.stringify(FacebookCookies, null, 2));
            await client.send("Fetch.continueRequest", { requestId });
        });
        const fbCookies = await getAsync("facebook_cookies");
        console.log(fbCookies);
        let queryElement = 'div.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q';
        if (!fbCookies) {
            await page.goto(url);
    
            console.log("Log in via credentials");
            await page.waitForSelector('#email')
            .catch(err => console.log(err.message));
            await page.type('#email', 'inforumProd@gmail.com');
            await page.type('#pass', "inforumToTheMoon");
    
            await page.click('#loginbutton')
            .catch(async _ => {
                await page.click('input[type="submit"]');
            })
            .catch(_ => {
                console.log("Facebook login failed.");
            });
        } else {
            console.log("Log in via cookies");
            const jsonCookies = JSON.parse(fbCookies);
            // const tmp = [];
            // jsonCookies.forEach(cookie => {
            //     if (!cookie.fr) {
            //         tmp.push(cookie);
            //     }
            // })
            console.log(jsonCookies);
            await page.setCookie(...jsonCookies);
            await page.goto(url, { waitUntil: 'networkidle0' });
        }
        
        // const handle = await page.evaluateHandle(() => document.querySelector(queryElement), queryElement);
        // await page.evaluate((selector) => {
        //     const elements = document.querySelectorAll(queryElement);
        //     for (let i = 0; i < elements.length; i += 1) {
        //         elements[i].parentNode.removeChild(elements[i]);
        //     }
        // });

        // Waits for the comment bar to show up,
        // This indicates that the post has been loaded.
        let elementNotFound = false;
        await page.waitForSelector(queryElement)
        .catch(async _=> {
            res.status(400).send({
                message: "Post verification failed. Post not visible."
            })
            // await browser.close();
            elementNotFound = true;
        })
        if (elementNotFound) {
            return;
        }
        // Gets the post text
        const content = await page.$$eval(queryElement, (nodes) => nodes.map((n) => n.innerText), queryElement);
        if (content.some((element) => element.includes(text))){
            res.status(200).send(content);
        } else {
            res.status(400).send({
                message: "Post verification failed. Link not found."
            })
        }
        console.log(content);
        // await browser.close();
    }
}

module.exports = FacebookWebScrapper;
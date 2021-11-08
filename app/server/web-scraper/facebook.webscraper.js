const BaseWebScrapper = require('./base.webscraper');
const puppeteer = require('puppeteer');
const FacebookPass = process.env.FACEBOOK_PASSWORD || "Don't commit password.";

// Find an element by the text it contains, optionally
// starting at specified parent element.
const getElementByText = ( text, ctx ) =>
{
  return document.evaluate("//*[.='"+text+"']", 
     ctx || document, null, XPathResult.ANY_TYPE, null).iterateNext();
}

/**
 * @class FacebookWebScrapper
 * @extends {BaseWebScrapper}
 */
class FacebookWebScrapper extends BaseWebScrapper{
    constructor() {
        super("Facebook");
        this.getPost = this.getPost.bind(this);
    }

    async getPost(req, res) {
        const url = req.query.url;
        const text = req.query.text;
        const browser = await puppeteer.launch({ headless: false, timeout: 5000 });
        const page = await browser.newPage().catch(err => console.log(err.message));
        page.setDefaultTimeout(5000);
        await page.goto(url);
        await page.waitForSelector('input[name=email]').catch(err => console.log(err.message));;
        await page.$eval('#email', el => el.value = 'inforumProd@gmail.com');
        await page.$eval('#pass', el => el.value = FacebookPass);
        await page.click('button[type="submit"]').catch(async _ => {
            await page.click('input[type="submit"]');
        })
        .catch(err => {
            res.status(500).send({
                message: "Facebook login failed."
            })
            return;
        });

        // Waits for the comment bar to show up,
        // This indicates that the post has been loaded.
        await page.waitForSelector('div.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q')
        .catch(err => {
            console.log(err);
            res.status(400).send({
                message: "Post verification failed. Post not visible."
            })
            return;
        })
        const handle = await page.evaluateHandle(() => document.querySelector('div.kvgmc6g5.cxmmr5t8.oygrvhab.hcukyx3x.c1et5uql.ii04i59q'));

        // Gets the post text
        const content = await handle.$$eval('div', (nodes) => nodes.map((n) => n.innerText));
        if (content.some((element) => element.includes(text))){
            res.status(200).send(content);
        } else {
            res.status(400).send({
                message: "Post verification failed. Link not found."
            })
        }
        await browser.close();
    }
}

module.exports = FacebookWebScrapper;
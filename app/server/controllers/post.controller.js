const BaseController = require("./base.controller");
const db = require('../models');
const userService = require('../auth/auth_services');
const Op = db.Sequelize.Op;
const User = db['User'];
const Campaign = db['Campaign'];
const Post = db['Post'];
const BaseWebScrapper = require('../web-scraper/base.webscraper');
const FacebookWebScrapper = require('../web-scraper/facebook.webscraper');

/**
 * @class PostController
 * @extends {BaseController}
 */
class PostController extends BaseController{
    constructor(){
        super(Post);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async create(req, res) {
        const user = await User.findByPk(req.body.userId);
        if (!user){
            res.status(400).send({
                message: "User does not exist"
            })
            return;
        }

        const campaign = await Campaign.findByPk(req.body.campaignId);
        if (!campaign){
            res.status(400).send({
                message: "Campaign does not exist"
            })
            return;
        }

        let webScraper;
        let postUrlRegex;
        switch(req.body.platform) {
            case "facebook":
                postUrlRegex = new RegExp(
                    '^https:\/\/www.facebook.com\/.*\/posts\/[0-9]+$'
                 );
                webScraper = new FacebookWebScrapper();
                break;
            default:
                // Should not end up here.
                webScraper = new BaseWebScrapper("base");
        }
        if ( !postUrlRegex.test(req.body.url) ) {
            res.status(400).send("Url does not match the format.");
        }
        let postData;
        try {
            postData = await webScraper.getPost(req.body.url);
            
        } catch (err) {
            if (err.message === "Facebook cookies not found." || err.message === "Something went wrong with scraping.") {
                res.status(500).send(err.message);
            } else {
                res.status(400).send(err.message);
            }
            return;
        }

        
        if ( postData && postData.message.includes(campaign.url)) {
            const post = {
                userId: user.id,
                campaignId: campaign.id,
                url: req.body.url,
                isVerified: true,
                socialMedia: req.body.platform
            };

            super.create(req, res, post);
        } else {
            res.status(400).send("Campaign url not found.")
        }
    };

    findAll(req, res) {
        const socialMedia = req.query.socialMedia || "";
        const isVerified = req.query.isVerified || null;
        const campaignId = req.query.userId || null;
        let condition = socialMedia ? { socialMedia: { [Op.iLike]: `%${socialMedia}%` } } : {};
        condition = isVerified ? { ...condition, isVerified: { [Op.eq]: isVerified }} : condition;
        condition = campaignId ? { ...condition, campaignId: { [Op.eq]: campaignId }} : condition;

        super.findAll(req, res, condition);
    };

    findOne(req, res) {
        super.findOne(req, res);
    };

    update(req, res) {
        super.findOne(req, res);
    };

    delete(req, res) {
        super.findOne(req, res);
    };

    deleteAll(req, res) {
        super.findOne(req, res);
    };
}

module.exports = PostController;
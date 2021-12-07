const BaseController = require("./base.controller");
const webScraperHelper = require("../helpers/webScraperHelper");
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db['User'];
const Campaign = db['Campaign'];
const Post = db['Post'];
const logger = require("../helpers/logger");

/**
 * @class PostController
 * @extends {BaseController}
 */
class PostController extends BaseController{
    constructor(){
        super(Post);
        this.create = this.create.bind(this);
        this.numClicksPlusOne = this.numClicksPlusOne.bind(this);
    }

    async create(req, res) {
        logger.info(`Post: create: UserId:${req.body.UserId} CampaignId:${req.body.CampaignId}`);
        const user = await User.findByPk(req.body.UserId);
        if (!user){
            res.status(404).send({
                message: "User does not exist"
            })
            return;
        }
        const campaign = await Campaign.findByPk(req.body.CampaignId);
        if (!campaign){
            res.status(404).send({
                message: "Campaign does not exist"
            })
            return;
        }
        const postExist = await Post.findAll({ where: 
            { CampaignId: { [Op.eq]: req.body.CampaignId }, UserId: { [Op.eq]: req.body.UserId }}
        });
        if (postExist.length > 0) {
            res.status(400).send({
                message: "User already posted for this campaign"
            })
            return;
        }
        let postData;
        try {
            postData = await webScraperHelper.getPostData(req.body.url, req.body.platform);
            
        } catch (err) {
            if (err.message === "Facebook cookies not found." || err.message === "Something went wrong with scraping.") {
                res.status(500).send(err);
            } else {
                res.status(400).send(err);
            }
            return;
        }
        if ( postData ) {
            const post = {
                UserId: user.id,
                CampaignId: campaign.id,
                url: req.body.url,
                isVerified: true,
                socialMedia: req.body.platform
            };

            await super.create(req, res, post);
        } else {
            res.status(400).send({ message: "Post not visible." });
        }
    };

    async numClicksPlusOne(req, res) {
        logger.info(`Post: numClicksPlusOne: UserId:${req.body.userId}, CamapaignId:${req.body.campaignId}`);
        const post = await Post.findOne({ where: { UserId: { [Op.eq]: req.body.userId }, CampaignId: { [Op.eq]: req.body.campaignId }}, include: { model: Campaign } });
        if (post !== null) {
            post.numClicks += 1;
            await post.save();
        }
        const campaign = await Campaign.findByPk(req.body.campaignId);
        if (campaign === null) {
            res.status(404).send({
                message: "Campaign not found."
            })
            return;
        }
        res.send(campaign.url);
    }
}

module.exports = PostController;
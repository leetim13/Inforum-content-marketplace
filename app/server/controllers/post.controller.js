const BaseController = require("./base.controller");
const webScrapperHelper = require("../helpers/webScrapperHelper");
const db = require('../models');
const userService = require('../auth/auth_services');
const Op = db.Sequelize.Op;
const User = db['User'];
const Campaign = db['Campaign'];
const Post = db['Post'];

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
        this.numClicksPlusOne = this.numClicksPlusOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async create(req, res) {
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
            postData = await webScrapperHelper.getPostData(req.body.url, req.body.platform);
            
        } catch (err) {
            console.log(err);
            if (err.message === "Facebook cookies not found." || err.message === "Something went wrong with scraping.") {
                res.status(500).send(err);
            } else {
                res.status(400).send(err);
            }
            return;
        }
        console.log(postData);
        
        if ( postData ) {
            const post = {
                UserId: user.id,
                CampaignId: campaign.id,
                url: req.body.url,
                isVerified: true,
                socialMedia: req.body.platform
            };

            super.create(req, res, post);
        } else {
            res.status(400).send({ message: "Post not visible." });
        }
    };

    findAll(req, res) {
        const socialMedia = req.query.socialMedia || "";
        const isVerified = req.query.isVerified || null;
        const campaignId = req.query.UserId || null;
        let condition = socialMedia ? { socialMedia: { [Op.iLike]: `%${socialMedia}%` } } : {};
        condition = isVerified ? { ...condition, isVerified: { [Op.eq]: isVerified }} : condition;
        condition = campaignId ? { ...condition, campaignId: { [Op.eq]: campaignId }} : condition;

        super.findAll(req, res, condition);
    };

    findOne(req, res) {
        super.findOne(req, res);
    };

    async numClicksPlusOne(req, res) {
        console.log(req.body);
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

    update(req, res) {
        super.update(req, res);
    };

    delete(req, res) {
        super.delete(req, res);
    };

    deleteAll(req, res) {
        super.deleteAll(req, res);
    };
}

module.exports = PostController;
const BaseController = require("./base.controller");
const db = require('../models');
const Role = require('../auth/role');
const Op = db.Sequelize.Op;
const Campaign = db['Campaign'];
const Bank = db['Bank'];
const Post = db['Post'];
const Insight = db['DailyInsight'];
const User = db['User'];
const logger = require("../helpers/logger");

/**
 * @class CampaignController
 * @extends {BaseController}
 */
class CampaignController extends BaseController{
    constructor(){
        super(Campaign);
    }

    // Create and Save a new User
    async create(req, res) {
        logger.info(`Campaign: create: BankId:${req.body.BankId}`);

        const bank = await Bank.findOne({ where: { id : req.body.BankId }});
        if (!bank){
            res.status(400).send({
                message: "Bank does not exist."
            })
            return;
        }
        // Create a Campaign
        const campaign = {
            ...req.body
        };

        await super.create(req, res, campaign);
    };

    // Retrieve all User from the database.
    async findAll(req, res) {
        const type = req.query.type;
        const bankId = req.query.BankId;
        logger.info(`Campaign: findAll: BankId:${bankId}, type:${type}`);

        let condition = type ? { type: { [Op.eq]: type } } : {};
        condition = bankId ? { ...condition, BankId: { [Op.eq]: bankId }} : condition;

        const campaigns = await Campaign.findAll({ attributes: { exclude: ["image"] }, where: condition });
        res.send(campaigns);
    };

    async closeCampaign(req, res) {
        const id = req.params.id;
        logger.info(`Campaign: closeCampaign: campaignId:${id}`);

        const campaign = await Campaign.findOne(
            { where: { id: { [Op.eq]: id}}, 
            include: [ { model: Post, required: false, where: { isVerified: { [Op.eq]: true }}, include: [ { model: User } ]} ]
        });
        if (campaign === null) {
            res.status(404).send({
                message: "Campaign not found."
            })
        } else {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            if (campaign.endDate >= tomorrow) {
                res.status(400).send({
                    message: "Campaign hasn't pass its end date yet."
                })
                return;
            }
            for (let i = 0; i < campaign.Posts.length; i++) {
                const user = campaign.Posts[i].User;
                user.rewardPoint += campaign.Posts[i].numClicks * 10;
                // 10 reward points per click.
                await user.save();
            }
            res.send({ message: "Success" });
        }
    }

    // Get Campaign image
    async getImage(req, res) {
        const id = req.params.id;
        logger.info(`Campaign: getImage: campaignId:${id}`);

        const campaign = await Campaign.findByPk(id);
        if (campaign === null) {
            res.status(404).send({
                message: "Campaign not found"
            })
        } else {
            res.send(campaign.image);
        }
    }

    // Find all insights for this campaign's posts
    async findAllPosts(req, res) {
        const id = parseInt(req.params.id);
        logger.info(`Campaign: findAllPosts: campaignId:${id}`);

        if (id === -1 && req.user.role !== Role.Admin) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        let whereCondition = {};
        if (id !== -1) {
            whereCondition.CampaignId = { [Op.eq]: id };
        } 
        const posts = await Post.findAll({ 
            where: whereCondition, 
            include: [
                { model: Insight, required: false }, 
                { model: Campaign, attributes: { exclude: ['image'] } },
                { model: User, attributes: { exclude: [ 'profilePicture' ] } } 
            ]
        });
        res.send(posts);
    }
}

module.exports = CampaignController;
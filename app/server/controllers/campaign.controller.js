const BaseController = require("./base.controller");
const webScrapperHelper = require("../helpers/webScrapperHelper");
const db = require('../models');
const userService = require('../auth/auth_services');
const Op = db.Sequelize.Op;
const Campaign = db['Campaign'];
const Bank = db['Bank'];
const Post = db['Post'];
const Insight = db['DailyInsight'];
const User = db['User'];

/**
 * @class CampaignController
 * @extends {BaseController}
 */
class CampaignController extends BaseController{
    constructor(){
        super(Campaign);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.getImage = this.getImage.bind(this);
        this.closeCampaign = this.closeCampaign.bind(this);
        this.findAllPosts = this.findAllPosts.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    // Create and Save a new User
    async create(req, res) {
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

        super.create(req, res, campaign);
    };

    // Retrieve all User from the database.
    findAll(req, res) {
        const type = req.query.type;
        const bankId = req.query.BankId;
        let condition = type ? { type: { [Op.eq]: type } } : {};
        condition = bankId ? { ...condition, BankId: { [Op.eq]: bankId }} : condition;

        Campaign.findAll({ attributes: { exclude: ["image"] }, where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        helpers.sequelizeErrorMessageHandler(err) || `Some error occurred while retrieving ${this.model.name}s.`
                });
            });
    };

    // Find a single User with an id
    findOne(req, res) {
        super.findOne(req, res);
    };

    async closeCampaign(req, res) {
        const id = req.params.id;
        const campaign = await Campaign.findOne(
            { where: { id: { [Op.eq]: id}}, 
            include: [ { model: Post, required: false, where: { isVerified: { [Op.eq]: true }}, include: [ { model: User } ]} ]
        });
        console.log(campaign);
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
        const id = req.params.id;
        const posts = await Post.findAll({ 
            where: { CampaignId: {[Op.eq]: id }}, 
            include: [
                { model: Insight, required: false }, 
                { model: User, attributes: { exclude: [ 'profilePicture' ] } } 
            ]
        });
        res.send(posts);
    }

    // Update a User by the id in the request
    update(req, res) {
        super.update(req, res);
    };

    // Delete a User with the specified id in the request
    delete(req, res) {
        super.delete(req, res);
    };

    // Delete all User from the database.
    deleteAll(req, res) {
        super.deleteAll(req, res);
    };
}

module.exports = CampaignController;
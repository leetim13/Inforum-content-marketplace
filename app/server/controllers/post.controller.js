const BaseController = require("./base.controller");
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
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async create(req, res) {
        const user = await User.findOne({ where: { id : req.body.userId }});
        if (!user){
            res.status(400).send({
                message: "User does not exist"
            })
            return;
        }

        const campaign = await Campaign.findOne({ where: { id: req.body.campaignId }});
        if (!campaign){
            res.status(400).send({
                message: "Campaign does not exist"
            })
            return;
        }

        // Create a Post
        const post = {
            ...req.body
        };

        super.create(req, res, post);
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
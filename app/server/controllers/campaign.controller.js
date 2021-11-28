const BaseController = require("./base.controller");
const db = require('../models');
const userService = require('../auth/auth_services');
const Op = db.Sequelize.Op;
const Campaign = db['Campaign'];
const Bank = db['Bank'];

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
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    // Create and Save a new User
    async create(req, res) {
        const bank = await Bank.findOne({ where: { id : req.body.bankId }});
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
        const bankId = req.query.bankId;
        let condition = type ? { type: { [Op.eq]: type } } : {};
        condition = bankId ? { ...condition, bankId: { [Op.eq]: bankId }} : condition;

        super.findAll(req, res, condition);
    };

    // Find a single User with an id
    findOne(req, res) {
        super.findOne(req, res);
    };

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
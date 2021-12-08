const BaseController = require("./base.controller");
const db = require('../models');
const Op = db.Sequelize.Op;
const Bank = db['Bank'];
const Campaign = db['Campaign'];
const Post = db['Post'];
const logger = require("../helpers/logger");

/**
 * @class BankController
 * @extends {BaseController}
 */
class BankController extends BaseController{
    constructor(){
        super(Bank);
    }

    // Retrieve all campaigns under this bank id.
    async findAllCampaigns(req, res) {
        const id = req.params.id;
        logger.info(`Bank: findAllCampaigns: BankId:${id}`);

        // exclude campaign image, because localStorage on front end can't store it.
        const campaigns = await Campaign.findAll({ 
            attributes: { exclude: ['image'] },
            where: { BankId: {[Op.eq]: id }}, 
            include: [{ model: Post }, { model: Bank }] });

        res.send(campaigns);
    };

    // Get Bank logo
    async getImage(req, res) {
        const id = req.params.id;
        logger.info(`Bank: getImage: BankId:${id}`);

        const bank = await Bank.findByPk(id);
        if (bank === null) {
            res.status(404).send({
                message: "Bank not found"
            })
        } else {
            res.send(bank.logo);
        }
    }
}

module.exports = BankController;
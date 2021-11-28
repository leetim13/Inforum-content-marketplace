const BaseController = require("./base.controller");
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db['User'];
const Bank = db['Bank'];

/**
 * @class BankController
 * @extends {BaseController}
 */
class BankController extends BaseController{
    constructor(){
        super(Bank);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    // Create and Save a new User
    async create(req, res) {
        const normalUser = await User.findOne({ where: { username : req.body.username }});
        if (normalUser){
            res.status(400).send({
                message: "Please choose another username."
            })
            return;
        }
        // Create a Bank
        const bank = {
            ...req.body,
            cash: 0
        };

        super.create(req, res, bank);
    };

    // Retrieve all User from the database.
    findAll(req, res) {
        const name = req.query.name || "";
        let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    
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

module.exports = BankController;
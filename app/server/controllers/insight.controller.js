const BaseController = require("./base.controller");
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db['User'];
const Campaign = db['Campaign'];
const Post = db['Post'];
const Insight = db['DailyInsight'];

/**
 * @class InsightController
 * @extends {BaseController}
 */
class InsightController extends BaseController{
    constructor(){
        super(Insight);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async create(req, res) {
        super.create(req, res);
    };

    findAll(req, res) {
        super.findAll(req, res, {});
    };

    findOne(req, res) {
        super.findOne(req, res);
    };

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

module.exports = InsightController;
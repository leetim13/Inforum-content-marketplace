const BaseController = require("./base.controller");
const webScrapperHelper = require("../business-logic/webScrapperHelper");
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
        this.generateToday = this.generateToday.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    async create(req, res) {
        super.create(req, res);
    };

    async generateToday(req, res) {
        const start = new Date();
        start.setUTCHours(0,0,0,0);

        const end = new Date();
        end.setUTCHours(23,59,59,999);
        const posts = await Post.findAll({
            include: [ 
                { model: Insight, required: false, where: { date: {[Op.between]: [start, end]} } },
                { model: User },
                { model: Campaign, where: { startDate: {[Op.lte]: start}, endDate: {[Op.gte]: start}}}
            ]});
        console.log(posts);
        try {
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                
                if (post.DailyInsights.length === 0) {
                    console.log("Generating for:");
                    console.log(post.id);
                    let postData;
                    try {
                        postData = await webScrapperHelper.getPostData(post.url, post.socialMedia);
                        
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
                        const insight = {
                            PostId: post.id,
                            date: new Date,
                            numClicks: post.numClicks,
                            numLikes: postData.likes,
                            rewardPoints: post.numClicks * 0.5 
                            // Amount of reward points given right now is 0.5 * every clicks received. so it is 1 : 1 to our business model
                        }
                        await Insight.create(insight);
                    } else {
                        post.isVerified = false;
                        await post.save();
                    }
                }
            }
            res.send("Success");
        } catch (e) {
            res.status(400).send(e);
        }
    }

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
const BaseController = require("./base.controller");
const webScrapperHelper = require("../helpers/webScrapperHelper");
const db = require('../models');
const Op = db.Sequelize.Op;
const User = db['User'];
const Campaign = db['Campaign'];
const Post = db['Post'];
const Insight = db['DailyInsight'];
const logger = require("../helpers/logger");

/**
 * @class InsightController
 * @extends {BaseController}
 */
class InsightController extends BaseController{
    constructor(){
        super(Insight);
        this.generateToday = this.generateToday.bind(this);
    }

    async generateToday(req, res) {
        const start = new Date();
        start.setHours(0,0,0,0);
        logger.info(`Insight: generateToday: ${start.toLocaleDateString()} In progress...`);

        const end = new Date();
        end.setHours(23,59,59,999);
        const posts = await Post.findAll({
            include: [ 
                { model: Insight, required: false, where: { date: {[Op.between]: [start, end]} } },
                { model: User },
                { model: Campaign, where: { startDate: {[Op.lte]: start}, endDate: {[Op.gte]: start}}}
            ]});
        // console.log(posts);
        try {
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                if (post.DailyInsights.length === 0) {
                    logger.info("Generating for:");
                    logger.info(post.id);
                    let postData;
                    try {
                        postData = await webScrapperHelper.getPostData(post.url, post.socialMedia);
                        
                    } catch (err) {
                        if (err.message === "Facebook cookies not found." || err.message === "Something went wrong with scraping.") {
                            res.status(500).send(err);
                        } else {
                            res.status(400).send(err);
                        }
                        return;
                    }
                    if ( postData ) {
                        const insight = {
                            PostId: post.id,
                            date: new Date,
                            numClicks: post.numClicks,
                            numLikes: postData.likes,
                            rewardPoints: post.numClicks * 10
                            // 10 reward points per click.
                        }
                        await Insight.create(insight);
                    } else {
                        post.isVerified = false;
                        await post.save();
                    }
                }
            }
            logger.info(`Insight: generateToday: ${start.toLocaleDateString()} Success!`);
            res.send("Success");
        } catch (e) {
            logger.error(e.message);
            res.status(400).send(e);
        }
    }
}

module.exports = InsightController;
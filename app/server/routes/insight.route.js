const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const InsightController =  require("../controllers/insight.controller");

module.exports = app => {
	const insights = new InsightController();
	
	var router = require("express").Router();

	// Generate insights if they do not already exist
	router.post("/generate", authorize([Role.Admin, Role.Bank]), insights.generateToday);
    
	/**
	 * @swagger
	 * /insights:
	 *   post:
	 *     description: Generate daily insights for today by web scraping all posts that doesn't already have one today.
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags:
	 *       - Insights
	 */
	app.use('/api/insights', router);
};
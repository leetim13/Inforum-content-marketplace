const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const InsightController =  require("../controllers/insight.controller");

module.exports = app => {
	const insights = new InsightController();
	
	var router = require("express").Router();

	// Create a new Insight
	// router.post("/", insights.create);

	// Generate insights if they do not already exist
	router.post("/generate", authorize([Role.Admin, Role.Bank]), insights.generateToday);

	// // Retrieve all Insight
	// router.get("/", insights.findAll);

	// // Retrieve a single Insight with id
	// router.get("/:id", insights.findOne);

	// // Update a Insight with id
	// router.put("/:id", insights.update);

	// // Delete a Insight with id
	// router.delete("/:id", insights.delete);

	// // Delete all Insights
	// router.delete("/", insights.deleteAll);

	app.use('/api/insights', router);
};
const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const InsightController =  require("../controllers/insight.controller");

module.exports = app => {
	const insights = new InsightController();
	
	var router = require("express").Router();

	// Create a new User
	// router.post("/", authorize([Role.Admin]), posts.create);
	router.post("/", insights.create);

	// Retrieve all User
	router.get("/", insights.findAll);

	// Retrieve a single User with id
	router.get("/:id", insights.findOne);

	// Update a User with id
	router.put("/:id", insights.update);

	// Delete a User with id
	router.delete("/:id", insights.delete);

	// Delete all Users
	router.delete("/", insights.deleteAll);

	app.use('/api/insights', router);
};
const authorize = require('../auth/authorize')
const Role = require('../auth/role');

module.exports = app => {
	const users = require("../controllers/user.controller.js");

	var router = require("express").Router();

	router.post('/authenticate', users.authenticate); 

	// Create a new User
	router.post("/", authorize([Role.Admin]), users.create);

	// Retrieve all User
	router.get("/", users.findAll);

	// Retrieve a single User with id
	router.get("/:id", users.findOne);

	// Update a User with id
	router.put("/:id", users.update);

	// Delete a User with id
	router.delete("/:id", users.delete);

	// Delete all Users
	router.delete("/", users.deleteAll);

	app.use('/api/users', router);
};
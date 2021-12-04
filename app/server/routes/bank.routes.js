const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const BankController = require('../controllers/bank.controller');

module.exports = app => {
	const banks = new BankController();

	var router = require("express").Router();

	// Get bank's image
	router.get("/:id/image", authorize([Role.User, Role.Bank, Role.Admin]), banks.getImage);

	// Retrieve all campaign under bank id
	router.get("/:id/campaigns", authorize([Role.Bank, Role.Admin]), banks.findAllCampaigns);

	app.use('/api/banks', router);
};
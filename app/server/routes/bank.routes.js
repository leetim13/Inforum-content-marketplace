const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const BankController = require('../controllers/bank.controller');

module.exports = app => {
	const banks = new BankController();

	var router = require("express").Router();

	// Create a new Bank
	router.post("/", authorize([Role.Admin]), banks.create);

	// Retrieve all Bank
	router.get("/", authorize([Role.Admin]), banks.findAll);

	// // Retrieve a single Bank with id
	// router.get("/:id", banks.findOne);

	// Get bank's image
	router.get("/:id/image", authorize([Role.User, Role.Bank, Role.Admin]), banks.getImage);

	// Retrieve all campaign under bank id
	router.get("/:id/campaigns", authorize([Role.Bank, Role.Admin]), banks.findAllCampaigns);

	// // Update a Bank with id
	// router.put("/:id", banks.update);

	// // Delete a Bank with id
	// router.delete("/:id", banks.delete);

	// Delete all Banks
	router.delete("/", authorize([Role.Admin]), banks.deleteAll);

	/**
	 * @swagger
	 * /banks:
	 *   get:
	 *     description: Get all banks
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Banks
	 *   post:
	 *     description: Create a new bank
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             required: true
	 *             $ref: '#/components/schemas/Bank'
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Banks
	 *   delete:
	 *     description: Delete all banks
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Banks
     * 
	 * /banks/{id}:
	 *   get:
	 *     description: Get a bank by their id
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: integer
	 *           required: true
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Banks
	 */
	app.use('/api/banks', router);
};
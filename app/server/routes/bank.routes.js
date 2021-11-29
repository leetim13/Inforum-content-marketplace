const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const BankController = require('../controllers/bank.controller');

module.exports = app => {
	const banks = new BankController();

	var router = require("express").Router();

	// Create a new User
	router.post("/", banks.create);

	// Retrieve all User
	router.get("/", banks.findAll);

	// Retrieve a single User with id
	router.get("/:id", banks.findOne);

	// Retrieve all post made by user with id
	router.get("/:id/campaigns", banks.findAllCampaigns);

	// Update a User with id
	router.put("/:id", banks.update);

	// Delete a User with id
	router.delete("/:id", banks.delete);

	// Delete all Users
	router.delete("/", banks.deleteAll);

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
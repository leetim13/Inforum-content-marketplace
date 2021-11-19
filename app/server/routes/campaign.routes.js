const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const CampaignController = require('../controllers/campaign.controller');

module.exports = app => {
	const campaigns = new CampaignController();

	var router = require("express").Router();

	// Create a new User
	router.post("/", campaigns.create);

	// Retrieve all User
	router.get("/", campaigns.findAll);

	// Retrieve a single User with id
	router.get("/:id", campaigns.findOne);

	// Update a User with id
	router.put("/:id", campaigns.update);

	// Delete a User with id
	router.delete("/:id", campaigns.delete);

	// Delete all Users
	router.delete("/", campaigns.deleteAll);

	/**
	 * @swagger
	 * /campaigns:
	 *   get:
	 *     description: Get all campaigns
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Campaigns
	 *   post:
	 *     description: Create a new campaign
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             required: true
	 *             $ref: '#/components/schemas/Campaign'
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Campaigns
	 *   delete:
	 *     description: Delete all campaigns
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Campaigns
     * 
	 * /campaigns/{id}:
	 *   get:
	 *     description: Get a campaign by their id
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
     *       - Campaigns
	 */
	app.use('/api/campaigns', router);
};
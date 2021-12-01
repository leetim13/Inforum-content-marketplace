const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const CampaignController = require('../controllers/campaign.controller');

module.exports = app => {
	const campaigns = new CampaignController();

	var router = require("express").Router();

	// Create a new Campaign
	router.post("/", authorize([Role.Bank, Role.Admin]), campaigns.create);

	// Retrieve all Campaign
	// router.get("/", authorize([Role.Bank, Role.User, Role.Admin]), campaigns.findAll);
	router.get("/", authorize([Role.Bank, Role.User, Role.Admin]), campaigns.findAll);


	// // Retrieve a single Campaign with id
	// router.get("/:id", campaigns.findOne);

	// Get campaign's image
	router.get("/:id/image", authorize([Role.Bank, Role.User, Role.Admin]), campaigns.getImage);

	// Retrive all posts under this campaign id with insights and users.
	router.get("/:id/posts", authorize([Role.Bank, Role.Admin]), campaigns.findAllPosts);

	// // Update a Campaign with id
	// router.put("/:id", campaigns.update);

	// // Delete a Campaign with id
	// router.delete("/:id", campaigns.delete);

	// Delete all Campaigns
	router.delete("/", authorize([Role.Bank, Role.Admin]), campaigns.deleteAll);

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
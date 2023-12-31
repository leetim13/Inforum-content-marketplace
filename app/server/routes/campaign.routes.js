const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const CampaignController = require('../controllers/campaign.controller');

module.exports = app => {
	const campaigns = new CampaignController();

	var router = require("express").Router();

	// Create a new Campaign
	router.post("/", authorize([Role.Bank, Role.Admin]), (req, res) => campaigns.create(req, res));

	// Retrieve all Campaign
	router.get("/", (req, res) => campaigns.findAll(req, res));

	// Close a campaign and distribute all reward points to user
	router.patch("/:id/close", authorize([Role.Bank, Role.Admin]), (req, res) => campaigns.closeCampaign(req, res));

	// Get campaign's image
	router.get("/:id/image", campaigns.getImage);

	// Retrive all posts under this campaign id with insights and users.
	router.get("/:id/posts", authorize([Role.Bank, Role.Admin]), (req, res) => campaigns.findAllPosts(req, res));

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
	 */
	app.use('/api/campaigns', router);
};
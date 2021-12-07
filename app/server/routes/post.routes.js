const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const PostController =  require("../controllers/post.controller");

module.exports = app => {
	const posts = new PostController();
	
	var router = require("express").Router();

	// Create a new Post
	router.post("/", authorize([Role.User, Role.Admin]), posts.create);

	// Linked clicked on post with this id, increase numClicks by 1, return url.
	router.patch("/", posts.numClicksPlusOne);

	/**
	 * @swagger
	 * /posts:
	 *   post:
	 *     description: Web scrape and create a post and verification
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               url:
	 *                 type: string
	 *                 required: true
	 *               platform:
	 *                 type: string
	 *                 required: true
	 *               campaignId:
	 *                 type: integer
	 *                 required: true
	 *               userId:
	 *                 type: integer
	 *                 required: true
	 *             example:
	 *               userId: 1
	 *               campaignId: 1
	 *               url: https://www.facebook.com/rbc/posts/6887752384569922
	 *               platform: facebook
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags:
	 *       - Posts
	 */
	app.use('/api/posts', router);
};
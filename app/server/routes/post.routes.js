const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const PostController =  require("../controllers/post.controller");
const BaseWebScrapper = require('../web-scraper/base.webscraper');
const FacebookWebScrapper = require('../web-scraper/facebook.webscraper');

// Choose the relevant platform
const getPost = (req, res) => {
	let webScraper;
	switch(req.query.platform) {
		case "facebook":
			webScraper = new FacebookWebScrapper();
			break;
		default:
			// Should not end up here.
			webScraper = new BaseWebScrapper("base");
	}
	webScraper.getPost(req, res);
}

module.exports = app => {
	const posts = new PostController();
	// const webScraper = new FacebookWebScrapper();
	
	var router = require("express").Router();

	// Create a new User
	// router.post("/", authorize([Role.Admin]), posts.create);
	router.post("/", posts.create);

	// Retrieve all User
	router.get("/", posts.findAll);

	router.get("/verify", (req, res) => getPost(req, res))

	// Retrieve a single User with id
	router.get("/:id", posts.findOne);

	// Update a User with id
	router.put("/:id", posts.update);

	// Delete a User with id
	router.delete("/:id", posts.delete);

	// Delete all Users
	router.delete("/", posts.deleteAll);

	/**
	 * @swagger
	 * /posts:
	 *   get:
	 *     description: Get all users
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Posts
	 *   post:
	 *     description: Create a new post
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             required: true
	 *             $ref: '#/components/schemas/Post'
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Posts
	 * 
	 * /posts/{id}:
	 *   get:
	 *     description: Get a post by their id
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
     *       - Posts
	 * 
	 * /posts/verify:
	 *   get:
	 *     description: Web scrape a post
	 *     parameters:
	 *       - in: query
	 *         name: url
	 *         schema:
	 *           type: string
	 *           format: uri
	 *           required: true
	 *       - in: query
	 *         name: platform
	 *         schema:
	 *           type: string
	 *           required: true
	 *       - in: query
	 *         name: text
	 *         schema:
	 *           type: string
	 *           required: true
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags:
	 *       - Posts
	 */
	app.use('/api/posts', router);
};
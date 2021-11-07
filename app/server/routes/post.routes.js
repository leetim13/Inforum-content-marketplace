const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const PostController =  require("../controllers/post.controller");

module.exports = app => {
	const posts = new PostController();

	var router = require("express").Router();

	// Create a new User
	// router.post("/", authorize([Role.Admin]), posts.create);
	router.post("/", posts.create);

	// Retrieve all User
	router.get("/", posts.findAll);

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
	 */
	app.use('/api/posts', router);
};
const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const UserController = require('../controllers/user.controller');

module.exports = app => {
	const users = new UserController();

	var router = require("express").Router();

	router.post('/authenticate', users.authenticate); 

	// Create a new User
	router.post("/", users.create);

	// Get user's profile picture
	router.get("/:id/image", authorize([Role.User, Role.Admin]), users.getImage);

	// Retrieve all post made by user with id
	router.get("/:id/posts", authorize([Role.User, Role.Admin]), users.findAllPosts);

	// Retrive all insights under a user's posts
	router.get("/:id/insights", authorize([Role.User, Role.Admin]), users.findAllInsights);

	/**
	 * @swagger
	 * /users/authenticate:
	 *   post:
	 *     description: Authenticate user
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               username:
	 *                 type: string
	 *                 required: true
	 *               password:
	 *                 type: string
	 *                 required: true
	 *             example:
	 *               username: admin
	 *               password: admin
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Users
	 */
	app.use('/api/users', router);
};
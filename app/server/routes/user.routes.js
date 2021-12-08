const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const UserController = require('../controllers/user.controller');

module.exports = app => {
	const users = new UserController();

	var router = require("express").Router();

	router.post('/authenticate', (req, res) => users.authenticate(req, res)); 

	// Create a new User
	router.post("/", (req, res) => users.create(req, res));

	// Get user's profile picture
	router.get("/:id/image", authorize([Role.User, Role.Admin]), (req, res) => users.getImage(req, res));

	// Retrieve all post made by user with id
	router.get("/:id/posts", authorize([Role.User, Role.Admin]), (req, res) => users.findAllPosts(req, res));

	// Retrive all insights under a user's posts
	router.get("/:id/insights", authorize([Role.User, Role.Admin]), (req, res) => users.findAllInsights(req, res));

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
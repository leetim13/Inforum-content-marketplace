const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const UserController = require('../controllers/user.controller');

module.exports = app => {
	const users = new UserController();

	var router = require("express").Router();

	router.post('/authenticate', users.authenticate); 

	// Create a new User
	router.post("/", users.create);

	// Retrieve all User
	router.get("/", authorize([Role.User, Role.Admin]), users.findAll);

	// // Retrieve a single User with id
	// router.get("/:id", users.findOne);

	// Get user's profile picture
	router.get("/:id/image", authorize([Role.User, Role.Admin]), users.getImage);

	// Retrieve all post made by user with id
	router.get("/:id/posts", authorize([Role.User, Role.Admin]), users.findAllPosts);

	// Retrive all insights under a user's posts
	router.get("/:id/insights", authorize([Role.User, Role.Admin]), users.findAllInsights);

	// // Update a User with id
	// router.put("/:id", users.update);

	// // Delete a User with id
	// router.delete("/:id", users.delete);

	// Delete all Users
	router.delete("/", authorize([Role.User, Role.Bank, Role.Admin]), users.deleteAll);

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
	 *     
	 * /users:
	 *   get:
	 *     description: Get all users
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Users
	 *   post:
	 *     description: Create a new user
	 *     requestBody:
	 *       content:
	 *         application/json:
	 *           schema:
	 *             required: true
	 *             $ref: '#/components/schemas/User'
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Users
	 *   delete:
	 *     description: Delete all user
	 *     responses:
	 *       200:
	 *         description: Success
	 *     tags: 
     *       - Users
	 * 
	 * /users/{id}:
	 *   get:
	 *     description: Get a user by their id
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
     *       - Users
	 */
	app.use('/api/users', router);
};
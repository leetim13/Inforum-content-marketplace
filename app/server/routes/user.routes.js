const authorize = require('../auth/authorize')
const Role = require('../auth/role');
const UserController = require('../controllers/user.controller');

module.exports = app => {
	const users = new UserController();

	var router = require("express").Router();

	router.post('/authenticate', users.authenticate); 

	// Create a new User
	// router.post("/", authorize([Role.Admin]), users.create);
	router.post("/", users.create);

	// Retrieve all User
	router.get("/", users.findAll);

	// Retrieve a single User with id
	router.get("/:id", users.findOne);

	// Update a User with id
	router.put("/:id", users.update);

	// Delete a User with id
	router.delete("/:id", users.delete);

	// Delete all Users
	router.delete("/", users.deleteAll);

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
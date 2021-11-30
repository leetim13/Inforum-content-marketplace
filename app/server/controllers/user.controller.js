const BaseController = require("./base.controller");
const db = require('../models');
const userService = require('../auth/auth_services');
const Op = db.Sequelize.Op;
const User = db['User'];
const Bank = db['Bank'];
const Post = db['Post'];
const Campaign = db['Campaign'];
const Insight = db['DailyInsight'];

/**
 * @class UserController
 * @extends {BaseController}
 */
class UserController extends BaseController{
    constructor(){
        super(User);
        this.authenticate = this.authenticate.bind(this);
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.getImage = this.getImage.bind(this);
        this.findAllPosts = this.findAllPosts.bind(this);
        this.findAllInsights = this.findAllInsights.bind(this);
        this.findOne = this.findOne.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
    }

    authenticate(req, res, next) {
        userService.authenticate(req.body)
            .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
            .catch(err => next(err));
    }

    // Create and Save a new User
    async create(req, res) {
        const bankUser = await Bank.findOne({ where: { username : req.body.username }});
        if (bankUser){
            res.status(400).send({
                message: "Please choose another username. This one is reserved for bank user."
            })
            return;
        }
        // Create a User
        const user = {
            ...req.body,
            rewardPoint: 0,
            connectionDemographic: {}
        };

        super.create(req, res, user);
    };

    // Retrieve all User from the database.
    findAll(req, res) {
        const firstName = req.query.firstName || "";
        const lastName = req.query.lastName || "";
        let condition = { firstName: { [Op.iLike]: `%${firstName}%` }, lastName: { [Op.iLike]: `%${lastName}%`} };

        super.findAll(req, res, condition);
    };

    // Retrieve all posts made by current user.
    async findAllPosts(req, res) {
        const id = req.params.id;
         // exclude campaign image, because localStorage on front end can't store it.
        const posts = await Post.findAll({ 
            where: { UserId: {[Op.eq]: id }}, 
            include: { model: Campaign, include: [ { model: Bank, attributes: { exclude: ['logo'] }} ], attributes: {exclude: [ 'image' ]}} 
        });
            
        console.log(posts);
        res.send(posts);
    }

    async findAllInsights(req, res) {
        const id = req.params.id;
        const posts = await Post.findAll({ 
            where: { UserId: {[Op.eq]: id }}, 
            include: { model: Insight, include: [ { model: Post } ]} 
        });
        console.log(posts);
        const insights = [];
        for (let i = 0; i < posts.length; i++) {
            const post = posts[i];
            for (let j = 0; j < post.DailyInsights.length; j++) {
                insights.push(post.DailyInsights[j]);
            }
        }
        console.log(insights);
        res.send(insights);
    }

    // Find a single User with an id
    findOne(req, res) {
        super.findOne(req, res);
    };

    // Get User profile picture
    async getImage(req, res) {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (user === null) {
            res.status(404).send({
                message: "User not found"
            })
        } else {
            console.log(user);
            res.send(user.profilePicture);
        }
    }

    // Update a User by the id in the request
    update(req, res) {
        super.update(req, res);
    };

    // Delete a User with the specified id in the request
    delete(req, res) {
        super.delete(req, res);
    };

    // Delete all User from the database.
    deleteAll(req, res) {
        super.deleteAll(req, res);
    };
}

module.exports = UserController;
const helpers = require('../helpers/sequelizeErrorMessageHandler');
const db = require('../models');
const Op = db.Sequelize.Op;

/**
 * @class BaseController
 * @abstract
 */
class BaseController{
    constructor(model){
        if (this.constructor === BaseController) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.model = model;
    }

    async create(req, res, object) {
        await this.model.create(object)
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        helpers.sequelizeErrorMessageHandler(err) || `Some error occurred while creating the ${this.model.name}.`
                });
            });
    }

    async findAll(req, res, condition) {
        await this.model.findAll({ where: condition })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        helpers.sequelizeErrorMessageHandler(err) || `Some error occurred while retrieving ${this.model.name}s.`
                });
            });
    }

    async findOne(req, res) {
        const id = req.params.id;
        await this.model.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find ${this.model.name} with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error retrieving ${this.model.name} with id=${id}`
                });
            });
    }

    async update(req, res) {
        const id = req.params.id;

        await this.model.update(req.body, { where: { id: id } })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: `${this.model.name} was updated successfully.`
                    });
                } else {
                    res.send({
                        message: `Cannot update ${this.model.name} with id=${id}. Maybe ${this.model.name} was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Error updating ${this.model.name} with id=${id}`
                });
            });
    }

    async delete(req, res) {
        const id = req.params.id;

        await this.model.destroy({ where: { id: { [Op.eq]: id } } })
            .then(num => {
                if (num === 1) {
                    res.send({
                        message: `${this.model.name} was deleted successfully!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete ${this.model.name} with id=${id}. Maybe ${this.model.name} was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Could not delete ${this.model.name} with id=${id}`
                });
            });
        }

    async deleteAll(req, res) {
        await this.model.destroy({where: {}, truncate: false})
            .then(nums => {
                res.send({ message: `${nums} ${this.model.name} were deleted successfully!` });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        helpers.sequelizeErrorMessageHandler(err) || `Some error occurred while removing all ${this.model.name}.`
                });
            });
    }
}

module.exports = BaseController;
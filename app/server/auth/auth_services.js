const secret = require('../config/config.json')["jwt"];
const jwt = require('jsonwebtoken');
const Role = require('./role');
const db = require('../models');
const users = db["User"];
const banks = db["Bank"];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    let user = await users.findOne({ where: { username : username, password : password}});
    let token;
    // search if user is a bank user.
    if (user) {
        token = jwt.sign({ sub: user.id, role: user.role }, secret);
        const { password, ...userWithoutPassword } = user.dataValues;
        return {
            ...userWithoutPassword,
            token
        };
    }
    user = await banks.findOne({ where: { username : username, password : password}})
    if (user) {
        token = jwt.sign({ sub: user.id, role: Role.Bank }, secret);
        const { password, ...userWithoutPassword } = user.dataValues;
        return {
            ...userWithoutPassword,
            role: Role.Bank,
            token
        };
    }
}
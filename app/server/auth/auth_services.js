const secret = require('../config/config.json')["jwt"];
const jwt = require('jsonwebtoken');
const Role = require('./role');
const db = require('../models');
const users = db["User"];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = await users.findOne({ where: { username : username, password : password}});
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role }, secret);
        const { password, ...userWithoutPassword } = user.dataValues;
        return {
            ...userWithoutPassword,
            token
        };
    }
}

// async function getAll() {
//     return users.map(u => {
//         const { password, ...userWithoutPassword } = u;
//         return userWithoutPassword;
//     });
// }

// async function getById(id) {
//     const user = users.find(u => u.id === parseInt(id));
//     if (!user) return;
//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
// }
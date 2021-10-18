module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        }
    });

    return User;
};
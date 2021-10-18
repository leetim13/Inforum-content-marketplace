const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
let isLocal = process.env.SERVER_ENV === undefined;

console.log("---------------");
console.log(process.env.DATABASE_URL);
console.log("---------------");

const sequelize = !isLocal ? 
    new Sequelize(process.env.DATABASE_URL, {
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }) :
    new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);

module.exports = db;
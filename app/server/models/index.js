const dbConfig = require("../configs/db.config.js");

const Sequelize = require("sequelize");
let db_url;
let isLocal = false;
switch(process.env.SERVER_ENV) {
    case "production":
        process.env.DATABASE_URL;
        console.log("what1");
        break;
    case "test":
        if (process.env.HEROKU_TEST_DB_URL !== undefined) {
            db_url = process.env.HEROKU_TEST_DB_URL;
            break;
        }
    default:
        isLocal = true;
  }

const sequelize = !isLocal ? 
    new Sequelize(db_url, {
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
const Logger = require('@logdna/logger');
var options = {
    app: "inforum-server",
    env: process.env.SERVER_ENV || "development",
    tags: ['logging', 'nodejs', 'logdna'] // Tags can also be provided in comma-separated string format: 'logging,nodejs,logdna'    
};

const logKey = require('../config/localConfig.json').logDNA.key;
console.log(logKey);
console.log(process.env.LOGDNA_KEY[0])
const logger = Logger.createLogger(logKey, options);
exports.info = (msg) => {
    logger.info(msg);
}

exports.error = (msg) => {
    logger.error(msg);
}
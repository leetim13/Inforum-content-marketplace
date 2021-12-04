const Logger = require('@logdna/logger');
var options = {
    app: "inforum-server",
    env: process.env.SERVER_ENV,
    tags: ['logging', 'nodejs', 'logdna'] // Tags can also be provided in comma-separated string format: 'logging,nodejs,logdna'    
};

exports.logger = Logger.createLogger("d2cb803c286659fcd0027047019553ae", options);
const Sentry = require("@sentry/node");
// or use es6 import statements
// import * as Sentry from '@sentry/node';

const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';
const authErrorHandler = require('./auth/errorHandler');
const express = require("express");
var cors = require('cors')
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 3001;
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger/swagger');

const app = express();

Sentry.init({
    dsn: "https://9d367e69f2374f96b461cc6cae04343d@o358880.ingest.sentry.io/5949857",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// set up cors
app.use(cors({ origin: CLIENT_URL }));

// parse requests of content-type - application/json
app.use(express.json({limit: '25mb'}));

// User routes
require("./routes/user.routes")(app);

// Bank routes
require("./routes/bank.routes")(app);

// Campaign routes
require("./routes/campaign.routes")(app);

// Post routes
require("./routes/post.routes")(app);

// Insight routes
require("./routes/insight.route")(app);

app.get("/api", (req, res) => {
    res.json({ message: `Hello from ${process.env.SERVER_ENV || 'development'} server!` });
});

app.get("/sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// auth error handler
app.use(authErrorHandler);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, {explorer: true}));
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
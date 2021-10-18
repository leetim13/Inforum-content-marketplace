const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 3001;
const app = express();
app.use(cors({ origin: CLIENT_URL }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

const db = require("./models");
db.sequelize.sync();

// User routes
require("./routes/user")(app);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
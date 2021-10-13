const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const app = express();

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
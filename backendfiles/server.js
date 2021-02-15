const express = require("express");
const db = require("./app/models");


const app = express();

require("./app/routes/user.route.js")(app);
require("./app/routes/quiz.route.js")(app);
require("./app/routes/quizscore.route.js")(app);
require("./app/routes/question.route.js")(app);
require("./app/routes/game.route.js")(app);
require("./app/routes/gameScore.route.js")(app);
require("./app/routes/homepage.route.js")(app);
require("./app/routes/status.route.js")(app);
require("./app/routes/favourite.route.js")(app);


db.sequelize.sync();

const PORT = 8080;
app.listen(PORT);
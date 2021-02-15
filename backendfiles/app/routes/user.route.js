module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const cors = require("cors");

  var router = require("express").Router();
  router.use(cors());
  const bodyParser = require("body-parser");

  router.use(bodyParser.json());

  router.get("/usersCount", users.usersCount);

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/:id", users.findOne);

  router.post("/signin", users.signin);

  router.put("/:id", users.update);

  router.delete("/:id", users.delete);

  router.delete("/", users.deleteAll);

  app.use('/api/user', router);
};
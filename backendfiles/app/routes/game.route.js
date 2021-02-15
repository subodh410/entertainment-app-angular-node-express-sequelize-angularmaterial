module.exports = app => {
  const game = require("../controllers/game.controller.js");

  var router = require("express").Router();

  const bodyParser = require("body-parser");

  router.use(bodyParser.json());

  router.post("/", game.create);

  router.get("/", game.findAll);

 

  router.get("/:id", game.findOne);

  router.put("/:id", game.update);

  router.delete("/:id", game.delete);

  router.delete("/", game.deleteAll);

  app.use('/api/game', router);
};
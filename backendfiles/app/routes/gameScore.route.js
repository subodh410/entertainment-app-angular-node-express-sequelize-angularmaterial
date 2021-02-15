module.exports = app => {
  const gameScore = require("../controllers/gameScore.controller.js");
  const cors = require("cors");
  var router = require("express").Router();

  const bodyParser = require("body-parser");
  router.use(cors());
  router.use(bodyParser.json());

  router.get("/getGameUserCount", gameScore.getGameUserCount);

  router.get("/getUsersWithHighGameScore", gameScore.getUsersWithHighGameScore);

  router.post("/", gameScore.create);

  router.get("/:id", gameScore.getGameScore);

  router.get("/published", gameScore.findAllPublished);

  router.put("/:id", gameScore.update);

  router.delete("/:id", gameScore.delete);

  router.delete("/", gameScore.deleteAll);

  app.use('/api/gameScore', router);
};
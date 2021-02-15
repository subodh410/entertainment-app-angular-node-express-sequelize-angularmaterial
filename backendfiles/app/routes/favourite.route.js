module.exports = app => {
  const favourite = require("../controllers/favourite.controller.js");
  const cors = require("cors");
  var router = require("express").Router();

  const bodyParser = require("body-parser");
  router.use(cors());

  router.use(bodyParser.json());

  router.post("/", favourite.create);

  router.get("/aaaa", favourite.findOne);

  router.put("/:id", favourite.update);

  router.delete("/:id", favourite.delete);

  router.delete("/", favourite.deleteAll);

  router.get("/:id", favourite.getFavourite);

  app.use('/api/favourite', router);
};
module.exports = app => {
  const status = require("../controllers/status.controller.js");
  const cors = require("cors");
  var router = require("express").Router();

  const bodyParser = require("body-parser");
  router.use(cors());

  router.use(bodyParser.json());

  router.post("/", status.create);

  router.get("/aaa", status.findAll);

  router.get("/", status.findOne);

  router.put("/", status.update);

  router.delete("/", status.delete);

  app.use('/api/status', router);
};
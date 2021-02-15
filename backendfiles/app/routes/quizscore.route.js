module.exports = app => {
  const quizescore = require("../controllers/quizscore.controller.js");
  const cors = require("cors");
  var router = require("express").Router();

  const bodyParser = require("body-parser");
  router.use(cors());

  router.use(bodyParser.json());

  router.get("/getQuizUserCount", quizescore.getQuizUserCount);

  router.get("/getUsersWithHighQuizScore", quizescore.getUsersWithHighQuizScore);

  router.post("/", quizescore.create);


  router.get("/", quizescore.findAll);

  router.get("/:id", quizescore.getQuizScore);

  router.get("/aaaa", quizescore.findOne);

  router.put("/:id", quizescore.update);

  router.delete("/:id", quizescore.delete);

  router.delete("/", quizescore.deleteAll);

  router.post("/sendmail", quizescore.sendMail);

  app.use('/api/quizscore', router);
};
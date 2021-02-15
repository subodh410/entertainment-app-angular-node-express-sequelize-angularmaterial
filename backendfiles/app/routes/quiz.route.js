module.exports = app => {
 
  const quizes = require("../controllers/quiz.controller.js");
  var router = require("express").Router();
  const cors = require("cors");

  router.use(cors());

  const bodyParser = require("body-parser");

  router.use(bodyParser.json());

  router.delete("/:id", quizes.deleteQuiz);

  router.post("/", quizes.create);

  router.get("/", quizes.findAll);

  router.get("/:category", quizes.findByCategory);

  router.get("/quizid/:id", quizes.findOne);

  router.put("/:id", quizes.update);

  router.delete("/:id", quizes.delete);

  router.delete("/", quizes.deleteAll);

  app.use('/api/quiz', router);
};
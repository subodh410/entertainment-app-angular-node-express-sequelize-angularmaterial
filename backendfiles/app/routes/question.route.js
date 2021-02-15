module.exports = app => {
    const questions = require("../controllers/question.controller.js");
    const cors = require("cors");
    var router = require("express").Router();
  
    const bodyParser = require("body-parser");
    router.use(cors());
  router.use(bodyParser.json());
  
    router.post("/", questions.create);
  
    router.get("/", questions.findAll);

    router.put("/:id", questions.update);
  
    router.delete("/:id", questions.delete);

    router.delete("/", questions.deleteAll);
  
    app.use('/api/questions', router);
  };
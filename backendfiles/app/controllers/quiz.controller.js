const db = require("../models");
const QuizScore = db.quizscore;
const Quiz = db.quiz;
const Questions = db.questions;
const Favourite = db.favourite;
const Op = db.Sequelize.Op;


exports.findAll = (req, res) => {

  Quiz.findAll()
    .then(data => {
      res.send(data);


    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving quiz."
      });
    });
};

exports.create = (req, res) => {

  const quiz = {
    quizname: req.body.quizname,
    category: req.body.category,
  };

  // Save Questions in the database
  Quiz.create(quiz)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the quiz."
      });
    });

};

exports.findByCategory = (req, res) => {
  const category1 = req.params.category;

  Quiz.findAll({
    where: {
      category: category1
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving quiz."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Quiz.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving quiz with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Quiz.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "quiz was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete quiz with id=${id}. Maybe quiz was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete quiz with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Quiz.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "quiz was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update quiz with id=${id}. Maybe quiz was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating quiz with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Quiz.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} quiz were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all quiz."
      });
    });
};




exports.deleteQuiz = (req, res) => {
  const id1 = req.params.id;

  Favourite.destroy({
    where: {
      quizid: id1 //this will be your id that you want to delete
    }
  }).then(function (rowDeleted) {
    Questions.destroy({
      where: {
        QuizId: id1 //this will be your id that you want to delete
      }
    }).then(function (rowDeleted) {
      QuizScore.destroy({
        where: {
          quizid: id1 //this will be your id that you want to delete
        }
      }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {

          res.send({
            message: "quiz was deleted successfully!"
          });
        }
        Quiz.destroy({
          where: {
            id: id1 //this will be your id that you want to delete
          }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
          if (rowDeleted === 1) {

            res.send({
              message: "quiz was deleted successfully!"
            });
          }
        }).catch((err) => {
         
          res.send(err);
        })
      }).catch((err) => {
       
        res.send(err);
      })

    }).catch((err) => {
     
      res.send(err);
    })

  }).catch((err) => {
   
    res.send(err);
  })

}


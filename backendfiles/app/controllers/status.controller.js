const db = require("../models");
const status = db.status;
const Op = db.Sequelize.Op;

const { QueryTypes } = require('sequelize');
exports.findAll = (req, res) => {
    status.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving status."
            });
        });
};

exports.create = (req, res) => {
    
    const status1 = {
        quizid: req.body.quizid,
        userid: req.body.userid,
        score: req.body.score,
        QuestionsAttempted:req.body.QuestionsAttempted
    };

 
    status.create(status1)
    
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

exports.findOne = async (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;
    
    status.findAll({ where: {
         quizid:quizid ,
         userid:userid
       
        }})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with"
            });
        });


    
};

exports.delete = (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;

    status.destroy({
        where: { 
            quizid:quizid,
            userid:userid
         }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id"
            });
        });
};

exports.update = (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;


    status.update(req.body, {
        where: { 
            quizid:quizid ,
            userid:userid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "staus was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial  Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating status"
            });
        });
};

exports.deleteAll = (req, res) => {
    status.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} status were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all status."
            });
        });
};



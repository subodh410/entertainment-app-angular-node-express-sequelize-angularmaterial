const db = require("../models");
const nodemailer = require("nodemailer");
const QuizScore = db.quizscore;
const Op = db.Sequelize.Op;
require('dotenv').config();


const { QueryTypes } = require('sequelize');
exports.findAll = (req, res) => {
    QuizScore.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving quizscores."
            });
        });
};

exports.create = (req, res) => {

    const quizscore = {
        quizid: req.body.quizid,
        userid: req.body.userid,
        score: req.body.score
    };

    // Save quizscore in the database
    QuizScore.create(quizscore)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the quizscore."
            });
        });

};

exports.findOne = async (req, res) => {
    const quizid = req.query.quizid;
    const userid = req.query.userid;

    QuizScore.findAll({
        where: {
            quizid: quizid,
            userid: userid
            //  $and :{userid:userid}
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving quizscore with id=" + quizid
            });
        });



};

exports.delete = (req, res) => {
    const quizid = req.params.id;

    QuizScore.destroy({
        where: { quizid: quizid }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "quizscore was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete quizscore with id=${id}. Maybe quizscore was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete quizscore with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    QuizScore.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "quizscore was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update quizscore with id=${id}. Maybe quizscore was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating quizscore with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    QuizScore.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} quizscores were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all quizscores."
            });
        });
};


exports.getQuizScore = (req, res) => {

    //show quizscore using user id
    db.sequelize.query("select (select quizname from quizzes where id in (select quizid from quizscores where userid = ?))as quizname, max(score) as score from quizscores where userid=?",
        {
            replacements: [req.params.id, req.params.id],
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);

        });
}

exports.getQuizName = (req, res) => {

    //show quizname using user id
    db.sequelize.query("select quizname from quizzes where id=(select quizid from quizscores where userid = ?",
        {

            replacements: [req.params.id],
            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);

        });
}

exports.sendMail = (req, res) => {

    let data = req.body;


    let transporter = nodemailer.createTransport({
        host: "172.27.172.202",
        port: 25,
        secure: false,
        auth: {
            // user: process.env.EMAIL,
            // pass: process.env.PASSWORD
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'SMTP',
        html: `<h1>Hello ${data.username},</h1>
                <h3>Your score of ${data.quizname} is ${data.score}</h3>`
    };

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error occures", err);
        } else {
            console.log("Email send successfully....");
        }
    });
};

exports.getUsersWithHighQuizScore = (req, res) => {

    db.sequelize.query("select users.username, quizscores.score as maxscore from users, quizscores where users.id = quizscores.UserId order by quizscores.score desc"
        ,
        {

            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);

        });
}

exports.getQuizUserCount = (req, res) => {

    db.sequelize.query("select quizzes.quizname,count(quizscores.userid) as usercount from quizzes,quizscores where quizzes.id=quizscores.quizid group by quizscores.quizid "
        ,
        {

            type: db.sequelize.QueryTypes.SELECT
        })
        .then(data => {
            res.send(data);

            console.log(data);
        });


}

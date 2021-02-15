module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      unique:true
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique:true
    },
    isadmin: {
      type: Sequelize.BOOLEAN,
    }
  },
  {timestamps: false});

  return User;
};


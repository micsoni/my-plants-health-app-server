const Sequelize = require("sequelize");
const db = require("../db");

const Plant = db.define("plant", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Plant's name can't be null"
      }
    }
  },
  image: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

module.exports = Plant;

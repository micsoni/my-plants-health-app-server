const Sequelize = require("sequelize");
const db = require("../db");

const Alarm = db.define(
  "alarm",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Alarm's name can't be null"
        }
      }
    },
    frequency: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Alarm's frequency can't be null"
        },
        isInt: true, 
      }
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  }
);

module.exports = Alarm;

const Sequelize = require("sequelize");
const db = require("../db");

const AlarmEvent = db.define(
  "alarmEvent",
  {
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          msg: "date can't be null"
        }
      }
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "time can't be null"
        }
      }
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    postponed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = AlarmEvent;

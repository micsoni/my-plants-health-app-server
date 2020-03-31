const Sequelize = require("sequelize");
const db = require("../db");

const Alarm = db.define("alarm", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Alarm's name can't be null"
      }
    }
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  dayOfTheWeek: {
    type: Sequelize.ARRAY({type:Sequelize.INTEGER, alowNull: true})
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "time can't be null"
      }
    }
  },
});

module.exports = Alarm;

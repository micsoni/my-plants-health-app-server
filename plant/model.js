const Sequelize = require("sequelize");
const db = require("../db");
const Alarm = require("../alarm/model");
const Note = require("../note/model");

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

//plant relation with alarm
Alarm.belongsTo(Plant);
Plant.hasMany(Alarm);

//plant relation with note
Note.belongsTo(Plant);
Plant.hasMany(Note);

module.exports = Plant;

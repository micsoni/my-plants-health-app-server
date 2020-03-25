const Sequelize = require("sequelize");
const db = require("../db");

const Note = db.define(
  "note",
  {
    title: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Note can't be null"
        }
    }
  }
  });

module.exports = Note;

const Sequelize = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "username can't be null"
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email can't be null"
        },
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "password can't be null"
        }
      }
    }
  },
  {
    timestamps: false
  }
);

module.exports = User;

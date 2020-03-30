const Sequelize = require("sequelize");
const db = require("../db");
const Plant = require("../plant/model")
const Subscription = require("../notification/model")

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

//plant relation with user
Plant.belongsTo(User);
User.hasMany(Plant);

Subscription.belongsTo(User)
User.hasMany(Subscription)

module.exports = User;


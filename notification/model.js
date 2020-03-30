const Sequelize = require("sequelize");
const db = require("../db");

const Subscription = db.define("subscription", {
  endpoint: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Subscription's endpoint can't be null"
      }
    }
  },
  expirationTime: {
    type: Sequelize.STRING,
  },
  keys: {
    type: Sequelize.JSONB
  },
  active: {
    type:Sequelize.BOOLEAN,
    defaultValue: true
  }

});

module.exports = Subscription;
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");
const Plant = require("../plant/model");
const auth = require("../auth/middleware");
const { toJWT } = require("../auth/jwt");

const router = express.Router();

router.post("/user", async (req, res, next) => {
  try {
    const userCredentials = {
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    if (
      !userCredentials.email ||
      !userCredentials.password ||
      !userCredentials.username
    ) {
      res.status(400).send({
        message: "Please supply a valid username, email and password"
      });
    } else {
      const createdUser = await User.create(userCredentials);
      const jwt = toJWT({ userId: createdUser.id });
      res.send({
        jwt,
        username: createdUser.username
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/user/current", auth, async (req, res, next) => {
  try {
    const userFound = await User.findByPk(req.user.dataValues.id, {
      include: [Plant]
    });

    if (!userFound) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.send(userFound);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

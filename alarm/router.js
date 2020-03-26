const express = require("express");
const auth = require("../auth/middleware");
const Alarm = require("./model");

const router = express.Router();

router.post("/alarm", auth, async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.frequency || !req.body.time) {
      res.status(400).send({
        message: "Please define a name, frequency and time"
      });
    } else {
      const postAlarm = await Alarm.create(req.body);
      res.send(postAlarm);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/alarm/:alarmId", auth, async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.frequency || !req.body.time) {
      res.status(400).send({
        message: "Please define a name, frequency and time"
      });
    } else {
      const alarm = await Alarm.findByPk(req.params.alarmId);
      const updated = await alarm.update(req.body);
      res.send(updated);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/alarm/:alarmId", auth, async (req, res, next) => {
  try {
    const number = await Alarm.destroy({ where: { id: req.params.alarmId } });
    if (number === 0) {
      res.status(404).send({ message: "No alarm found" });
    } else {
      res.status(202).json(number);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

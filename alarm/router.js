const express = require("express");
const auth = require("../auth/middleware");
const authorize = require("../user/middleware");
const Alarm = require("./model");
const router = express.Router();
const Plant = require("../plant/model");

router.post("/alarm", auth, authorize, async (req, res, next) => {
  try {
    if (!req.body.name || !req.body.time) {
      res.status(400).send({
        message: "Please define a name and time"
      });
    } else {
      const postAlarm = await Alarm.create(req.body);
      res.send(postAlarm);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/alarm/:alarmId", auth, authorize, async (req, res, next) => {
  try {
    const alarm = await Alarm.findByPk(req.params.alarmId);
    const updated = await alarm.update(req.body);
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/alarm/:alarmId", auth, authorize, async (req, res, next) => {
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

router.get("/alarm", auth, async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      where: { userId: req.user.dataValues.id },
      include: [Alarm],
      order: [["id", "DESC"]]
    });

    const alarms = plants.reduce((acc, plant) => {
      plant.alarms.forEach(alarm => {
        alarm.dataValues.plant = { ...plant.dataValues, alarms: undefined };
      });
      return acc.concat(plant.alarms);
    }, []);

    res.send(alarms);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

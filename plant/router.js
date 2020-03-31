const express = require("express");
const Plant = require("../plant/model");
const auth = require("../auth/middleware");
const Alarm = require("../alarm/model");
const Note = require("../note/model");

const router = express.Router();

router.get("/plant/:plantId", auth, async (req, res, next) => {
  try {
    const plantFound = await Plant.findByPk(req.params.plantId, {
      include: [Alarm, Note]
    });

    if (!plantFound) {
      return res.status(404).send({ message: "Plant not found" });
    }

    if (plantFound.userId !== req.user.dataValues.id) {
      return res.status(401).send({ message: "User unauthorized" });
    }

    return res.send(plantFound);
  } catch (error) {
    next(error);
  }
});

router.get("/plant", auth, async (req, res, next) => {
  const limit = Math.min(req.query.limit || 12, 50);
  const offset = req.query.offset || 0;
  try {
    const allPlants = await Plant.findAndCountAll({
      where: { userId: req.user.dataValues.id },
      include: [Alarm, Note],
      limit,
      offset,
      order: [["id", "DESC"]]
    });

    allPlants.pageCount = Math.ceil(allPlants.count / limit);
    allPlants.pages = [...Array(allPlants.pageCount).keys()].map(key => ({
      number: ++key
    }));

    res.send(allPlants);
  } catch (error) {
    next(error);
  }
});

router.post("/plant", auth, async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "All plants must have a name"
      });
    }
    req.body.userId = req.user.dataValues.id;
    const postPlant = await Plant.create(req.body);
    return res.send(postPlant);
  } catch (error) {
    next(error);
  }
});

router.put("/plant/:plantId", auth, async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "All plants must have a name"
      });
    }
    const plant = await Plant.findByPk(req.params.plantId);
    if (plant.userId !== req.user.dataValues.id) {
      return res.status(401).send({ message: "User unauthorized" });
    }
    const updated = await plant.update(req.body);
    return res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/plant/:plantId", auth, async (req, res, next) => {
  try {
    const number = await Plant.destroy({
      where: { id: req.params.plantId, userId: req.user.dataValues.id }
    });
    if (number === 0) {
      res.status(404).send({ message: "No plant found" });
    } else {
      res.status(202).json(number);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

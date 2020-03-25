const express = require("express");
const auth = require("../auth/middleware");
const authorize = require("../user/middleware");

const router = express.Router();

// prettier-ignore

router.get("/user/:userId/plant", auth, authorize, async (req, res, next) => {
  const limit = Math.min(req.query.limit || 8, 50);
  const offset = req.query.offset || 0;
  try {
    const allPlants = await Plant.findAndCountAll({
      include: [Alarm],
      limit,
      offset
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

router.post("/user/:userId/plant", auth, authorize, async (req, res, next) => {
  try {
    if (!req.body.name) {
      res.status(400).send({
        message: "All plants must have a name"
      });
    } else {
      const postPlant = await Plant.create(req.body);
      res.send(postPlant);
    }
  } catch (error) {
    next(error);
  }
});

// prettier-ignore
router.put("/user/:userId/plant/:plantId", auth, authorize, 
async (req, res, next) => {
    try {
      if (!req.body.name) {
        res.status(400).send({
          message: "All plants must have a name"
        });
      } else {
        const plant = await Plant.findByPk(req.params.plantId);
        const updated = await plant.update(req.body);
        res.send(updated);
      }
    } catch (error) {
      next(error);
    }
  }
);

// prettier-ignore
router.delete("/user/:userId/plant/:plantId", auth, authorize,
  async (req, res, next) => {
    try {
      const number = await Plant.destroy({ where: { id: req.params.plantId } });
      if (number === 0) {
        res.status(404).send({ message: "No plant found" });
      } else {
        res.status(202).json(number);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
const Plant = require("../plant/model");

async function authorize(req, res, next) {
  const plant = await Plant.findByPk(req.body.plantId);
  if (!plant) {
    return res.status(404).send({ message: "Plant not found" });
  }

  if (plant.userId !== req.user.dataValues.id) {
    return res.status(401).send({ message: "User unauthorized" });
  }

  return next();
}

module.exports = authorize;

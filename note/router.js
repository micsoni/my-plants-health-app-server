const express = require("express");
const auth = require("../auth/middleware");
const authorize = require("../user/middleware")
const Note = require("./model");
const Plant = require("../plant/model")

const router = express.Router();

router.post("/note", auth, authorize, async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400).send({
        message: "You can't have an empty note"
      });
    } else {
      const postNote = await Note.create(req.body);
      res.send(postNote);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/note/:noteId", auth, authorize, async (req, res, next) => {
  try {
    if (!req.body.text) {
      res.status(400).send({
        message: "You can't have an empty note"
      });
    } else {
      const note = await Note.findByPk(req.params.noteId);
      const updated = await note.update(req.body);
      res.send(updated);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/note/:noteId", auth, authorize, async (req, res, next) => {
  try {
    const number = await Note.destroy({ where: { id: req.params.noteId } });
    if (number === 0) {
      res.status(404).send({ message: "No note found" });
    } else {
      res.status(202).json(number);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/note", auth, async (req, res, next) => {
  try {
    const plants = await Plant.findAll({
      where: { userId: req.user.dataValues.id },
      include: [Note],
      order: [["id", "DESC"]]
    });

    const notes = plants.reduce((acc, plant) => {
      plant.notes.forEach(note => {
        note.dataValues.plant = { ...plant.dataValues, notes: undefined };
      });
      return acc.concat(plant.notes);
    }, []);

    res.send(notes);
  } catch (error) {
    next(error);
  }
});


module.exports = router;

var express = require("express");
var router = express.Router();

const db = require("../models/index");

router.post("/", async (req, res, next) => {
  try {
    await db.lendings.create({
      user_id: req.query.user_id,
      book_id: req.query.book_id,
    });

    await db.counts.update(
      {
        count: db.sequelize.literal(`count + 1`),
      },
      {
        where: {
          book_id: req.query.book_id,
        },
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).send();
    return;
  }

  res.status(201).send();
});

router.delete("/", async (req, res, next) => {
  try {
    await db.lendings.destroy({
      where: {
        book_id: req.query.book_id,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).send();
    return;
  }

  res.status(204).send();
});

module.exports = router;

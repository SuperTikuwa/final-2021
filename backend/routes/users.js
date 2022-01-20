const { json } = require("express");
var express = require("express");
var router = express.Router();

const db = require("../models/index");

router.get("/", async (req, res, next) => {
  const users = await db.users.findAll();
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    await db.users.create({ name: req.query.name });
  } catch (e) {
    console.log(e);
    res.status(400).send("User already exists");
    return;
  }

  const u = await db.users.findOne({ where: { name: req.query.name } });

  res.status(201).send({ id: u.id });
});

router.post("/admin", (req, res, next) => {
  if (req.body.password === "admin") {
    res.status(200).send();
    return;
  }
  res.status(401).send();
});

module.exports = router;

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
    res.status(400).send("User already exists");
    return;
  }

  res.status(201).send();
});

module.exports = router;

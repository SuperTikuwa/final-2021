var express = require("express");
var router = express.Router();

const db = require("../models/index");

router.get("/", async (req, res, next) => {
  const books = await db.sequelize.query(
    "select books.id,title,authors,thumbnail,publishedYear,u.name as lending from books left join lendings l on books.id = l.book_id left join users u on l.user_id = u.id;",
    { type: db.sequelize.QueryTypes.SELECT }
  );

  res.json(books);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const book = {
    title: body.title,
    authors: body.authors,
    thumbnail: body.thumbnail,
    publishedYear: body.publishedYear,
  };

  try {
    const b = await db.books.create(book);
    await db.counts.create({
      book_id: b.id,
    });
  } catch (e) {
    // console.error(e);
  }

  res.status(201).send();
});

module.exports = router;

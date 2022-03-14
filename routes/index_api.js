const fs = require("fs");
const path = require("path");
const router = require("express").Router();
let saveNote = [];
let db = require("../db/db.json");

router.get("/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    res.json(JSON.parse(data));
  });
});

router.get("/notes/:id", (req, res) => {
  const noteId = +req.params.id;
  const theNote = db.filter((note) => noteId === note.id);
  res.status(200).send(theNote);
});

router.post("/notes", (req, res) => {
  const body = req.body;
  fs.readFile(path.join(__dirname, "../db/db.json"), (err, data) => {
    if (err) {
      throw err;
    }

    saveNote = JSON.parse(data);
    body.id = Math.floor(Math.random() * 10000);
    saveNote.push(body);
    fs.writeFileSync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(saveNote)
    );
    res.status(200).send(saveNote);
  });
});

module.exports = router;
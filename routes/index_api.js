const fs = require('fs');
var path = require("path");
const dbPath = path.join(__dirname, "../db/db.json");
const { v4: uuidv4 } = require('uuid')

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) throw err;
            var notesResponse = JSON.parse(data)
            res.json(notesResponse);
        })
    });

    app.post("/api/notes", function (req, res) {
        
        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) throw err;

            let savedNotes;

            if (data) {
                savedNotes = JSON.parse(data)
            }

            let newNote = req.body

            newNote.id = uuidv4()

            if (savedNotes) {
                savedNotes.push(newNote);
            } else {
                savedNotes = [newNote];
            }

            fs.writeFile(dbPath, JSON.stringify(savedNotes), (err, data) => {
                if (err) throw err;
                res.json(newNote);
            })

        })
    })

    app.delete("/api/notes/:id", function (req, res) {

        let deleteId = req.params.id

        fs.readFile(dbPath, 'utf8', (err, data) => {
            if (err) throw err;

            let noteArray = JSON.parse(data);

            for (let i = 0; i < noteArray.length; i++) {
                if (deleteId == noteArray[i].id) {
                    noteArray.splice(i, 1)
                }
            }

            fs.writeFile(dbPath, JSON.stringify(noteArray), (err, data) => {
                if (err) throw err;
                res.send();
               
            })
        })

    })
}
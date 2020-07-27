const express = require("express");
const path = require("path");
const fs = require("fs");


// sets up the express app
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// route for get request at index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

// route for get request at /motes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});


// route for /api/notes get request
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})
// route for the post request to add new note to the db.json file
app.post("/api/notes", function (req, res) {

    // reads db.json file using fs 
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) { throw err }
        // creates an array from the data in the db.json file
        var jData = JSON.parse(data);
        // creates a new note from the data sent in the post request
        var newNote = req.body
        // creates a unique Id for each note, used to display the active note when chosen and to delete the note
        newNote.id = jData.length + 1;
        //    adds the new note to the array of notes
        jData.push(newNote);
        // writes the jData array back to the db.json file
        fs.writeFile("./db/db.json", JSON.stringify(jData), "utf-8", function (err) {
            if (err) {
                throw err
            }
            console.log("success")

        })


    })
    res.send("success")
})

// route to delete note based on an id, in this case the index +1
app.delete("/api/notes/:id", function (req, res) {

    // sets a variable id with the id of the note sent in the delete request
    var id = (req.params.id);
    // this line reads the json file using fs
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) throw err
        // parses json and creates array of objects called jData
        var jData = JSON.parse(data);
        // finds the index in jData array of the object with the id sent in the delete request
        var delIndex = jData.findIndex(element => element.id == id)
        //    deletes the note object from the array of notes
        jData.splice(delIndex, 1);
        // writes array back to db.json file to save notes array
        fs.writeFile("./db/db.json", JSON.stringify(jData), "utf-8", function (err) {
            if (err) {
                throw err
            }
            console.log("success")
        })
    })
    res.send("success")


})



app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
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
app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/view.html"));
});

// route for /api/notes get request
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
})
app.post("/api/notes", function (req, res) {


    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) { throw err }
        var jData = JSON.parse(data);
        var newNote = req.body
        newNote.id = jData.indexOf(this);
        console.log(req.body)
        jData.push(newNote);

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

    var id = (req.params.id);
    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) { throw err }
        var jData = JSON.parse(data);
        console.log(jData)
        console.log(id)
        jData.splice(id, 1);
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
const express = require("express");
const path = require("path");
const fs = require("fs");


// sets up the express app
var app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.post("/api/notes", function (req, res) {


    fs.readFile("./db/db.json", "utf-8", function (err, data) {
        if (err) { throw err }
        var jData = JSON.parse(data);
        jData.push(req.body);

        fs.writeFile("./db/db.json", JSON.stringify(jData), "utf-8", function (err) {
            if (err) {
                throw err
            }
            console.log("success")
        })


    })
})


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
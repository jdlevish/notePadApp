const express = require("express");
const path = require("path");


// sets up the express app
var app = express();
var PORT = process.env.PORT || 3001;

// route for get request at index.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})

// route for get request at /motes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});
// 


app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
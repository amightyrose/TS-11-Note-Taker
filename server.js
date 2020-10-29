// Dependencies
const express = require("express");
const path = require("path");
const { getNotesData, addNote, getNewId, deleteNote } = require("./lib/notes");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


//=======================
// Routes
//=======================

// The /notes route sends the notes page to the browser.
app.get("/notes", function(req, res) {
	res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function(req, res) {
	res.json(getNotesData());
});


app.post("/api/notes", function(req, res) {
	addNote(req.body, getNewId());
	res.json(getNotesData());
});


app.post("/api/notes/:id", function(req, res) {
	deleteNote(req.params.id);
	res.json(getNotesData());
});

// Default route. Sends the home page.
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});




// Start the server
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});

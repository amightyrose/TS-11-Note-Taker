const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "../db/db.json")


// Function to read from the db.json file and parse it.
const getNotesData = () => {

	const data = fs.readFileSync(dbFile, "utf-8");
	return JSON.parse(data);

}

const arrNotesData = getNotesData();


// Function to write new note to db.json.
const addNote = (newNote) => {

	// Get notes array and push the new note.
	arrNotesData.push(newNote);

	// Save the array back to the file.
	fs.writeFileSync(dbFile, JSON.stringify(arrNotesData));

}




module.exports = {
	arrNotesData,
	addNote
}
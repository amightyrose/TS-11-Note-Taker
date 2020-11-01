const fs = require("fs");
const path = require("path");

const outputDir = path.resolve(__dirname, "../db");
const dbFile = path.join(outputDir, "db.json")


// Function to read from the db.json file and parse it.
// Returns an array of existing note objects or an empty array.
const getNotesData = () => {

	let data;

	// Check if the db file exists. If it does, read it.
	if (fs.existsSync(dbFile)) {
		data = fs.readFileSync(dbFile, "utf-8");
	}

	// If there are existing notes, parse the data and return. Otherwise return
	// an empty array.
	if (data) {
		return JSON.parse(data);
	}

	return [];

}


// Function to assign an ID number to a new note.
const getNewId = () => {

	// Create an empty array to store existing Ids.
	arrIds = [];

	// Call getNotesData to get current notes.
	arrNotes = getNotesData();

	// If any notes exist, iterate through the array and add the id for each object to arrIds.
	// Then get the highest value in arrIds and add 1 to get the new id. If not, set the new id to 1.
	if (arrNotes.length > 0) {

		arrNotes.forEach(note => {
			arrIds.push(note.id);
		});

		// Use spread operator because Math.max needs discrete variables to work. Add 1 to the
		// highest value and return it.
		return Math.max(...arrIds) + 1;

	}

	// If we get to here there were no existing notes so create the first id as 1.
	return 1;

}


// Function to write new note to db.json.
const addNote = (newNote, newId) => {

	// Check the output directory exists and create it if necessary.
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir);
	}

	// Add an id number to the new note.
	newNote.id = newId;

	// Get note array.
	const arrNotes = getNotesData();

	// Push the new note.
	arrNotes.push(newNote);

	// Save the array back to the file.
	fs.writeFileSync(dbFile, JSON.stringify(arrNotes));

}


// Function to delete note from db.json.
const deleteNote = (id) => {

	// Get notes from file.
	let arrNotes = getNotesData();

	// Iterate through notes and delete the one with matching id.
	arrNotes.forEach((note, index) => {
		if (note.id === +id) {
			arrNotes.splice(index, 1);
		}
	});

	// If the array is now empty, delete the json file. Otherwise, write back to the file.
	if (arrNotes.length === 0) {
		fs.unlinkSync(dbFile, (err) => {
			console.log(`Error removing file: ${err}`);
		});
	}
	else {
		console.log("Writing file.");
		fs.writeFileSync(dbFile, JSON.stringify(arrNotes));
	}

}


// Exports
module.exports = {
	getNotesData,
	getNewId,
	addNote,
	deleteNote
}

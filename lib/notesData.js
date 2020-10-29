const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "../db/db.json")


// Function to read from the db.json file and parse it.
const getNotesData = () => {

	const data = fs.readFileSync(dbFile, "utf-8");

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

		getNotesData().forEach(note => {
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

	// Add an id number to the new note.
	newNote.id = newId;

	// Get note array.
	const arrNotesData = getNotesData();

	// Push the new note.
	arrNotesData.push(newNote);

	// Save the array back to the file.
	fs.writeFileSync(dbFile, JSON.stringify(arrNotesData));

}



module.exports = {
	getNotesData,
	getNewId,
	addNote
}

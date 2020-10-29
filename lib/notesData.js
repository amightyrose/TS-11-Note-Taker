const fs = require("fs");
const path = require("path");

const dbFile = path.join(__dirname, "../db/db.json")


// Function to read from the db.json file and parse it.
const getNotesData = () => {

	const data = fs.readFileSync(dbFile, "utf-8");
	return JSON.parse(data);

}


// Function to assign an ID number to a new note.
const getNewId = () => {

	// Create an empty array to store existing Ids.
	arrIds = [];

	// Call getNotesData to get current notes. Iterate through the array and add the indes
	// for each object to arrIds.
	getNotesData().forEach(note => {
		arrIds.push(note.id);
	});

	console.log(arrIds);

	// Get the highest value in arrIds and add 1 to get the new id. Use spread operator so the
	// Math.max method works.
	const newId = Math.max(...arrIds) + 1;
	console.log(`New id is ${newId}`);

	return newId;

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

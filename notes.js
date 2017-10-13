console.log('Starting notes.js');

const fs = require('fs');  //Built in filesystem read and write nodejs library

// Read all notes from JSON file
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

// save a note to JSON file
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filterNotes = notes.filter((note) => note.title === title);
  return filterNotes[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var filterNotes = notes.filter((note) => note.title !== title);
  saveNotes(filterNotes);
  return notes.length !== filterNotes.length;

};

var logNote = (note) => {
  console.log("--");
  console.log(`Title : ${note.title}`);
  console.log(`Command : ${note.body}`);
};



module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
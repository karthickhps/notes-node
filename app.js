console.log("Starting app.js");

const fs = require('fs');  //Built in filesystem read and write nodejs library
const yargs = require('yargs'); // 3rd party command line input library 

const notes = require('./notes.js'); // calling our module

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
};

var values = yargs
    .command('add', 'Add a new note', { title: titleOptions, body: bodyOptions })
    .command('list', 'List all notes')
    .command('read', 'Read a note', { title: titleOptions })
    .command('remove', 'Remove a note', { title: titleOptions })
    .argv;

var command = values._[0];

// Add a new note into JSON file  : node app.js add --title="yourOwnTitle" --body="yourDescription"
if (command === 'add') {
    var note = notes.addNote(values.title, values.body);
    if (note) {
        console.log("Note Created");
        notes.logNote(note);

    } else {
        console.log("Title not taken");
    }

// To view all notes from  JSON file  : node app.js list    
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s). `);
    allNotes.forEach((note) => notes.logNote(note));

// To read a note from a  JSON file  : node app.js read --title="yourOwnTitle" 
} else if (command === 'read') {
    var note = notes.getNote(values.title);
    if (note) {
        console.log("Note found");
        notes.logNote(note);

    } else {
        console.log("Note not found");
    }
   
// To remove a note from a  JSON file  : node app.js remove --title="yourOwnTitle" 
    } else if (command === 'remove') {
    var noteRemoved = notes.removeNote(values.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);

} else {
    console.log('Enter valid command');
}
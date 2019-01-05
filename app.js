const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

var title = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

var body = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add', 'Add a new note', {
        title,
        body 
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title
    })
    .command('remove', 'Remove all notes', {
        title
    })
    .help()
    .argv;
var command = argv._[0];

if(command === 'add'){
   var note = notes.addNote(argv.title, argv.body);
   if(note){
       console.log('note created');
       notes.logNote(note);
   }else{
       console.log('note title taken')
   }
}else if(command === 'list'){
    var allnotes = notes.getAll();
    console.log(`Printing ${allnotes.length} note(s)`);
    allnotes.forEach((note) => notes.logNote(note));
}else if(command === 'read'){
    var noteRead = notes.getNote(argv.title);
    if(noteRead){
        console.log('note read');
        notes.logNote(noteRead);
    }else{
        console.log('note title not found')
    }
}else if(command === 'remove'){
    var noteRemove = notes.removeNote(argv.title);
    var message = noteRemove ? 'Note was removed' : 'Note not found';
    console.log(message);
}else{
    console.log('Command not recognized');
}

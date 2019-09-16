const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);
  // debugger;
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.red.bgWhite("New note added!"));
  } else {
    console.log(chalk.white.bgBlue("Note title is a duplicate"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.white.bgGreen("Note Removed!"));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.white.bgRed("Note not removed!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.bgWhite("My notes"));

  notes.forEach(note => {
    console.log(note.title);
    console.log(note.body + "\n");
  });
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);

  if (note) {
    // console.log(chalk.blue.bgWhite('My note'));
    console.log(chalk.green(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.bgWhite("No note found"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};

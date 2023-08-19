const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

    const newNote = {
    title,
    text,
    id: uuidv4(),
    };

  if (req.body) {
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding note');
  }
});

// TODO: work on delete route


module.exports = notes
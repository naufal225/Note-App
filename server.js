// server.js

const express = require('express');
const bodyParser = require('body-parser');
const {addNote, getNotes, getNoteById, updateNoteById, deleteNoteById} = require('./notes');

const app = express();
const port = '5500';

app.use(bodyParser.json());
app.use(express.static(`public`));

// Endpoint untuk menambah catatan

app.post('/notes', (req, res) => {
    const {title, content} = req.body;
    const note = addNote(title, content);
    res.status(201).json(note);
});

// Endpoint untuk mengambil semua catatan

app.get('/notes', (req, res) => {
    res.json(getNotes());
});

// Endpoint untuk mendapatkan catatan berdasarkan id

app.get('/notes/:id', (req, res) => {
    const note = getNoteById(Number(req.params.id));
    if(note) {
        res.json(note);
    } else {
        res.status(404).send('Not Found');
    }
});

// Endpoint untuk mengupdate catatan berdasarkan id

app.put('/notes/:id', (req, res) => {
    const {title, content} = req.body;
    const note = updateNoteById(Number(req.params.id), title, content);
    if(note) {
        res.json(note);
    } else {
        res.status(404).send('Not Found');
    }
});

// Endpoint untuk menghapus catatan berdasarkan id

app.delete('/notes/:id', (req, res) => {
    const note = deleteNoteById(Number(req.params.id));
    if(note) {
        res.json(note);
    } else {
        res.status(404).send('Not Found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
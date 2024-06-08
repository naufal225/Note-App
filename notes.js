// notes.js
let notes = [];

function addNote(title, content) {
    const note = {id: Date.now(), title: title, note: content}
    notes.push(note);
    return note;
}

function getNotes() {
    return notes;
}

function getNoteById(id) {
    return notes.find(note => note.id === id);
}

function updateNoteById(id, newTitle, newNote) {
    const note = getNoteById(id);
    if(note) {
        note.title = newTitle;
        note.note = newNote;
        return note;
    }
    return null;
}

function deleteNoteById(id) {
    const index = notes.findIndex(note => note.id === id);
    if(index !== -1) {
        return notes.splice(index, 1)[0];
    }
    return null;
}

module.exports = {addNote, getNotes, getNoteById, updateNoteById, deleteNoteById};
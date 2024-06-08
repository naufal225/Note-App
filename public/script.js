document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("note-form");
    const notesList = document.getElementById("notes");

    const fetchNotes = async () => {
        const res = await fetch("/notes");
        const notes = await res.json();

        notesList.innerHTML =  ``;
        notes.forEach(note => {
            const li = document.createElement("li");
            const text = document.createElement("span");
            text.textContent = `${note.title} : ${note.note}`;
            const division = document.createElement("div");
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                deleteNote(note.id);
            });
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", () => {
                editNote(note.id);
            });
            li.appendChild(text);
            li.appendChild(division);
            division.appendChild(editButton);
            division.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    };

    const addNote = async (title, content) => {
        await fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                content
            })
        });
        fetchNotes();
    };

    const deleteNote = async (id) => {
        await fetch(`notes/${id}`, {
            method: 'DELETE'
        });
        fetchNotes();
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        addNote(title, content);
        form.reset();
    });

    fetchNotes();
})
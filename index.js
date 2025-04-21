const express = require("express");

const PORT = 3001;

const app = express();

app.use(express.json());

let notes = [];

//Create new note
app.post("/notes", (req, res, next) => {
  const { title, content } = req.body;
  try {
    if (title && content !== null) {
      const newNote = {
        id: notes.length + 1,
        title: title,
        content: content,
      };
      notes.push(newNote);
      res.status(201).json(newNote);
    } else {
      res.status(400).json({ message: "All inputs required" });
    }
  } catch (err) {
    next(err);
  }
});

//Put new details to existing notes
app.put("/notes/:id", (req, res, next) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;
  try {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      notes[noteIndex] = {
        id: noteId,
        title: title || notes[noteIndex].title,
        content: content || notes[noteIndex].content,
      };
      res.status(201).json(notes[noteIndex]);
    } else {
      res.status(400).json({ message: "Note not found" });
    }
  } catch (err) {
    next(err);
  }
});

//Delete note by Id
app.delete("/notes/:id", (req, res, next) => {
  const noteId = parseInt(req.params.id);

  try {
    const noteIndex = notes.findIndex((n) => n.id === noteId);

    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      res.status(204).json(notes);
    } else {
      res.status(404).json({ message: "Id not found" });
    }
  } catch (err) {
    next(err);
  }
});

//Get all notes
app.get("/notes", (req, res, next) => {
  const content = req.query.content;
  try {
    if (content) {
      const filteredNotes = notes.filter((note) => note.content === content);
      res.send(filteredNotes);
    } else {
      res.send(notes);
    }
  } catch (err) {
    next(err);
  }
});

//Get notes by id
app.get("/notes/:id", (req, res, next) => {
  const noteId = parseInt(req.params.id);
  try {
    if (noteId) {
      const findNotesbyId = notes.find((note) => note.id === noteId);
      res.send(findNotesbyId);
    } else {
      res.status(400).json({ message: "Id not found" });
    }
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const status = err.status;
  const response = {
    message: err.message,
    status: status,
  };
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }
  console.error(err.stack);
  res.status(status).json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT} ✅`);
});

const express = require("express");

const PORT = 3001;

const app = express();

app.use(express.json());

let notes = [];

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

//Create new note
app.post("/notes", (req, res, next) => {
  const { title, content } = req.body;

  const newNote = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  notes.push(newNote);

  res.status(201).json(newNote);
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

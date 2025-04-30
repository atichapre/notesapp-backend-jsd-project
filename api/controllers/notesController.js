import { Note } from "../../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const { user } = req.user;
    const notes = await Note.find({ userId: user._id }).sort({
      createdAt: -1,
      isPinned: -1,
    });
    res.json(notes);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Failed to fetch notes",
      details: err.message,
    });
  }
};

export const createNote = async (req, res) => {
  const { title, content, tags = [], isPinned = false } = req.body;

  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      message: "All fields required!",
    });
  }

  if (!user || !user._id) {
    return res.status(400).json({
      error: true,
      message: "Invalid user credentials!",
    });
  }

  try {
    const note = await Note.create({
      title,
      content,
      tags,
      isPinned,
      userId: user._id,
    });

    await note.save();
    res.json({
      error: false,
      note,
      message: "Note added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const updateNote = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (err) {
    next(err);
  }
};

export const updateIsPinned = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isPinned = !note.isPinned; // Toggle pinned state
    await note.save();

    res.status(200).json({ isPinned: note.isPinned });
  } catch (err) {
    next(err);
  }
};

export const getNoteById = async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id).populate("userId");
    return res.json({
      error: false,
      notes,
      message: "All notes retreived!",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      res.json({
        error: false,
        deletedNote,
        message: "Note deleted successfully!",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const searchNote = async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user.user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } }, // Case-insensitive title match
        { content: { $regex: new RegExp(query, "i") } }, // Case-insensitive content match
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

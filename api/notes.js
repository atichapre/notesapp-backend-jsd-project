import express from "express";
import {
  createNote,
  getAllNotes,
  updateNote,
  updateIsPinned,
  getNoteById,
  deleteNote,
  searchNote,
} from "./controllers/notesController.js";
import { authUser } from "./../middleware/auth.js";

const router = express.Router();

// Apply authentication to all routes
router.use(authUser);

// Notes management routes
router.get("/notes", getAllNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.put("/notes/:id/pinned", updateIsPinned);
router.get("/notes/:id", getNoteById);
router.delete("/notes/:id", deleteNote);
router.get("/search", searchNote);

export default router;

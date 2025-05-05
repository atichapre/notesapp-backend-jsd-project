import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
} from "./controllers/usersController.js";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);

// Get a single user by ID
router.get("/users/:id", getUserById);

// Register a new user
router.post("/auth/register", registerUser);

//Login a user
router.post("/auth/login", loginUser);

// Export router
export default router;

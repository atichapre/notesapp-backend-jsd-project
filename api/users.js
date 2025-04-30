import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
} from "./controllers/usersController.js";

const router = express.Router();

// Get all users
router.get("/users", getAllUsers);

// Register a new user
router.post("/auth/register", registerUser);

//Login a user
router.post("/auth/login", loginUser);

// Export router
export default router;

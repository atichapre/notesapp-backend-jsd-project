import express from "express";
import mongoUsers from "./users.js";
import mongoNotes from "./notes.js";

const router = express.Router();

export default () => {
  router.use("/", mongoUsers);
  router.use("/", mongoNotes);
  return router;
};

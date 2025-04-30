import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRoutes from "./api/routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error(`Failed to connect to MongoDB ❌: ${err}`);
    process.exit(1);
  }
})();

app.use("/", apiRoutes());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

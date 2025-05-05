import { Schema, model, mongoose } from "mongoose";

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPinned: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// createdAt: { type: Date, default: Date.now() },
// updatedAt: { type: Date, default: new Date() },

export const Note = model("Note", NoteSchema);

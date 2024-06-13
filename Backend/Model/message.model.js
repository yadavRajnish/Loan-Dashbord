import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: {
    type: String,
    default: null,
  },
  status: {
    type: Number,
    default: 1,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("message", messageSchema);

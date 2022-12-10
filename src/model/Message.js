import mongoose from "mongoose";
const messageSchema = mongoose.Schema({
  name: String,
  email: String,
  description: String,
  hiring: { type: Boolean, default: false },
  message: String,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

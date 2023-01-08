import Message from "../model/Message";
import validateMessage from "../validations/message_validations";
export class MessageServices {
  static async sendMessage(data) {
    const { name, email, description, hiring, message, date } = data;
    const m = new Message({
      name,
      email,
      description,
      hiring,
      message,
      date,
    });
    await m.save();
    return { type: "response", data: m };
  }

  static async viewMessages() {
    const messages = await Message.find();
    return messages;
  }

  static async viewSingleMessage(id) {
    const message = await Message.findOne({ _id: id });
    return message;
  }

  static async deleteMessage(id) {
    return await Message.deleteOne({ _id: id });
  }
}

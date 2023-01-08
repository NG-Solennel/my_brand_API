import Message from "../model/Message";
import { MessageServices } from "../services/messageService";

export class MessageController {
  static async sendMessage(req, res) {
    try {
      const { name, email, description, hiring, message } = req.body;
      const data = {
        name,
        email,
        description,
        hiring,
        message,
        date: new Date(),
      };
      const response = await MessageServices.sendMessage(data);
      return res.status(200).json({ MessageSent: response.data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async viewMessages(req, res) {
    try {
      const messages = await MessageServices.viewMessages();
      if (messages.length == 0) {
        return res.status(404).json({ Error: "No messages yet" });
      } else {
        return res.status(200).json({ messages });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async viewSingleMessage(req, res) {
    try {
      const message = await MessageServices.viewSingleMessage(req.params.id);
      if (message == null) {
        return res.status(404).json({ Error: "Message not found" });
      } else {
        return res.status(200).json({ message });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error });
    }
  }

  static async deleteMessage(req, res) {
    try {
      await MessageServices.deleteMessage(req.params.id);
      res.status(200).json({ message: "Message deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  }
}

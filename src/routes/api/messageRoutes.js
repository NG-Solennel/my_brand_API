import express from "express";
import { MessageController } from "../../controller/messageController";
import passport from "passport";
import { messageValidation } from "../../middleware/auth/validations";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();

route.post("/", messageValidation, MessageController.sendMessage);
route.get(
  "/",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.viewMessages
);
route.get(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.viewSingleMessage
);
route.delete(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.deleteMessage
);
export default route;

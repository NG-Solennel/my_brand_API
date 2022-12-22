import express from "express";
import { MessageController } from "../../controller/messageController";
import passport from "passport";
import { commentValidation } from "../../middleware/auth/validations";
const route = express.Router();

route.post("/", commentValidation, MessageController.sendMessage);
route.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  MessageController.viewMessages
);
route.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.viewSingleMessage
);
route.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  MessageController.deleteMessage
);
export default route;

import {
  userValidation,
  loginValidation,
} from "../../middleware/auth/validations";
import express from "express";
import { AdminController } from "../../controller/adminController";
import passport from "passport";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();
route.post(
  "/signup",
  checkAdmin,
  userValidation,
  passport.authenticate("jwt", { session: false }),
  AdminController.addAdmin
);
route.get(
  "",
  passport.authenticate("jwt", { session: false }),
  AdminController.getAdmin
);
route.post("/login", loginValidation, AdminController.login);

export default route;

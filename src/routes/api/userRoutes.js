import express from "express";
import { UserController } from "../../controller/userController";
import passport from "passport";
import isLogged from "../../middleware/auth/googleMid";
import checkAdmin from "../../middleware/auth/checkAdmin";
import {
  userValidation,
  loginValidation,
} from "../../middleware/auth/validations";
const route = express.Router();
route.post(
  "/signup",
  userValidation,
  passport.authenticate("jwt", { session: false }),
  UserController.addUser
);
route.post("/login", loginValidation, UserController.login);
route.get(
  "/googleLogin",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get("/signup", (req, res) => {
  res.json({ message: "Not Authorized" });
});
route.get("/login", isLogged);
route.get(
  "/googleLogin/redirect",
  passport.authenticate("google", {
    successRedirect: "/api/users/login",
    failureRedirect: "/api/users/signup",
  })
);

route.get(
  "",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  UserController.getUsers
);

export default route;

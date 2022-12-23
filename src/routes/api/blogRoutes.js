import express from "express";
import { BlogController } from "../../controller/blogController";
import checkAuth from "../../middleware/auth/verifyToken";
import passport from "passport";
import { blogValidation } from "../../middleware/auth/validations";
import checkAdmin from "../../middleware/auth/checkAdmin";

const route = express.Router();

route.post(
  "/",
  checkAdmin,
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.createBlog
);
route.get("/", BlogController.viewBlogs);
route.get("/:id", BlogController.viewSingleBlog);
route.delete(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  BlogController.deleteBlog
);
route.put(
  "/:id",
  checkAdmin,
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.updateBlog
);

export default route;

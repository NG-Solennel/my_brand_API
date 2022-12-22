import express from "express";
import { BlogController } from "../../controller/blogController";
import checkAuth from "../../middleware/auth/verifyToken";
import passport from "passport";
import { blogValidation } from "../../middleware/auth/validations";

const route = express.Router();

route.post(
  "/",
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.createBlog
);
route.get("/", BlogController.viewBlogs);
route.get("/:id", BlogController.viewSingleBlog);
route.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  BlogController.deleteBlog
);
route.put(
  "/:id",
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.updateBlog
);

export default route;

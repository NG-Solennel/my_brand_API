import express from "express";
import blogRoutes from "./api/blogRoutes";
import commentRoutes from "./api/commentRoutes";
import messageRoutes from "./api/messageRoutes";
import likeRoutes from "./api/likeRoutes";
import userRoutes from "./api/userRoutes";
import adminRoutes from "./api/adminRoutes";
const routes = express.Router();

routes.use("/blogs", blogRoutes);
routes.use("/blogs", commentRoutes);
routes.use("/blogs", likeRoutes);
routes.use("/messages", messageRoutes);
routes.use("/users", userRoutes);
routes.use("/admin", adminRoutes);

export default routes;

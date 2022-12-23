import express from "express";
import { LikeController } from "../../controller/likeController";
import likeAuth from "../../middleware/auth/likeCommentAuth";
const route = express.Router();

route.post("/:id/like", likeAuth, LikeController.like);

export default route;

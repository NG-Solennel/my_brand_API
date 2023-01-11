import express from "express";
import { LikeController } from "../../controller/likeController";
import likeAuth from "../../middleware/auth/likeCommentAuth";
const route = express.Router();

route.post("/:id/like", likeAuth, LikeController.like);
/**
 * @swagger
 * /blogs/{blogId}/like:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Adding or removing a like on a blog
 *     description: Adding or removing a like on a blog
 *     operationId: postLike
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: ID of blog to like
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: id
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized (Needs token)
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */

export default route;

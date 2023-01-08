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
 *           example: 63a567bc2a672df0a5192bb8
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likedBlog:
 *                   $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */

export default route;

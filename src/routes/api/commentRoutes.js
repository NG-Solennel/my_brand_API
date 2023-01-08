import express from "express";
import { CommentController } from "../../controller/commentController";
import { commentValidation } from "../../middleware/auth/validations";
import commentAuth from "../../middleware/auth/likeCommentAuth";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    Comment:
 *      type: object
 *      properties:
 *       name:
 *         type: string
 *         example: Ngabo Solennel
 *       email:
 *         type: string
 *         format: email
 *         example: ngsol@gmail.com
 *       message:
 *         type: string
 *         example: first swagger comment
 *       _id:
 *         type: string
 *         format: objectId
 *         example: 63a567bc2a672df0a5192bb8
 *       date:
 *         type: string
 *         format: date
 *         example: 2023-01-03T05:28:43.667Z
 */

route.post(
  "/:id/comments",
  commentValidation,
  commentAuth,
  CommentController.createComment
);
/**
 * @swagger
 * /blogs/{blogId}/comments:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Comment on a blog
 *     description: Commenting on a blog
 *     operationId: postComment
 *     requestBody:
 *       description: Post a comment on a blog
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: first swagger comment
 *       required: true
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: ID of blog to return
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
 *                  CommentedBlog:
 *                    type: object
 *                    $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */

route.get("/:id/comments", CommentController.viewComments);
/**
 * @swagger
 * /blogs/{blogId}/comments:
 *  get:
 *     tags:
 *       - Blogs
 *     summary: Get all comments on a blog
 *     description: Get all comments on a blog
 *     operationId: getComments
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: ID of blog to return
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
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Internal server error
 */

route.get("/:bid/comments/:cid", CommentController.viewSingleComment);
/**
 * @swagger
 * /blogs/{blogId}/comments/{commentId}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get a single comment on a blog
 *     description: Get a single comment on a blog
 *     operationId: getSingleComment
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: ID of blog
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *       - name: commentId
 *         in: path
 *         description: ID of comment
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
 *                 comment:
 *                  $ref: '#/components/schemas/Comment'
 *       '500':
 *         description: Internal server error
 */

route.delete(
  "/:bid/comments/:cid",
  checkAdmin,
  CommentController.deleteComment
);
/**
 * @swagger
 * /blogs/{blogId}/comments/{commentId}:
 *    delete:
 *      tags:
 *         - Blogs
 *      summary: Delete a comment on a blog
 *      description: Delete a comment on a blog
 *      operationId: deleteComment
 *      parameters:
 *        - name: blogId
 *          in: path
 *          description: ID of blog
 *          required: true
 *          schema:
 *            type: string
 *            format: objectId
 *            example: 63a567bc2a672df0a5192bb8
 *        - name: commentId
 *          in: path
 *          description: ID of comment
 *          required: true
 *          schema:
 *            type: string
 *            format: objectId
 *            example: 63a567bc2a672df0a5192bb8
 *      responses:
 *        '200':
 *          description: successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    default: Comment Deleted
 *        '500':
 *          description: Internal server error
 */
export default route;

import express from "express";
import { BlogController } from "../../controller/blogController";
import passport from "passport";
import { blogValidation } from "../../middleware/auth/validations";
import checkAdmin from "../../middleware/auth/checkAdmin";

const route = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *      type: object
 *      properties:
 *       _id:
 *         type: string
 *         format: objectId
 *         example: 63a567bc2a672df0a5192bb8
 *       title:
 *         type: string
 *         # format: int64
 *         example: Blog post 1
 *       content:
 *         type: string
 *         # format: int32
 *         example: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas facilisis diam ornare, pulvinar justo eu.
 *       image:
 *        type: object
 *        properties:
 *          public_id:
 *            type: string
 *            example: my_brand_andela/gaueqstlrpbhqju3aakl
 *          url:
 *            type: string
 *            example: https://res.cloudinary.com/dx7sba7u0/image/upload/v1672673554/my_brand…
 *       comments:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              format: objectId
 *              example: 63a567bc2a672df0a5192bb8
 *            name:
 *              type: string
 *              example: Ngabo Solennel
 *            email:
 *              type: string
 *              format: email
 *              example: ngsol@gmail.com
 *            message:
 *              type: string
 *              example: first swagger comment
 *            date:
 *              type: string
 *              format: date
 *              example: 2023-01-03T05:28:43.667Z
 *       likes:
 *        type: object
 *        properties:
 *          Count:
 *            type: integer
 *            example: 1
 *          People:
 *            type: array
 *            items:
 *              type: string
 *              format: email
 *              example: ngsol@gmail.com
 *       __v:
 *        type: integer
 *        example: 1
 */

route.post(
  "/",
  checkAdmin,
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.createBlog
);
/**
 * @swagger
 * /blogs:
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Add a new blog
 *     description: Add a new blog
 *     operationId: addBlog
 *     requestBody:
 *       description: Create a new blog
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: Blog title 1
 *                content:
 *                  type: string
 *                  example: Blog content should be string of any size
 *                image:
 *                  type: string
 *                  format: dataurl
 *                  example: data:img:png...
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '409':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */
route.get("/", BlogController.viewBlogs);
/**
 * @swagger
 * /blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Getting a list of all blogs
 *     description: Getting all blogs
 *     operationId: viewBlogs
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */
route.get("/:id", BlogController.viewSingleBlog);
/**
 * @swagger
 * /blogs/{blogId}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Find blog by ID
 *     description: Returns a single blog
 *     operationId: getBlogById
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
 *               $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */
route.delete(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  BlogController.deleteBlog
);

/**
 * @swagger
 * /blogs/{blogId}:
 *  delete:
 *     tags:
 *       - Blogs
 *     summary: Deletes a blog by ID
 *     description: delete a blog
 *     operationId: deleteBlog
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: Blog Id to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     responses:
 *       '200':
 *         description: Successfull operation
 *       '404':
 *         description: Blog with that Id not found
 *       '401':
 *         description: Not Authorized
 *     security:
 *       - {}
 *       - bearerAuth: []
 */

route.put(
  "/:id",
  checkAdmin,
  blogValidation,
  passport.authenticate("jwt", { session: false }),
  BlogController.updateBlog
);

/**
 * @swagger
 * /blogs/{blogId}:
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update blog
 *     description: Update blog
 *     operationId: UpdateBlog
 *     parameters:
 *       - name: blogId
 *         in: path
 *         description: Blog Id to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *     requestBody:
 *       description: Update blog
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  example: Blog title 1
 *                content:
 *                  type: string
 *                  example: Blog content should be string of any size
 *                image:
 *                  type: string
 *                  format: dataurl
 *                  example: data:img:png...
 *
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '409':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */

export default route;

import express from "express";
import { MessageController } from "../../controller/messageController";
import passport from "passport";
import { messageValidation } from "../../middleware/auth/validations";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    Message:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Ngabo Solennel
 *         email:
 *           type: string
 *           format: email
 *           example: ngsol@gmail.com
 *         message:
 *           type: string
 *           example: first swagger comment
 *         _id:
 *           type: string
 *           format: objectId
 *           example: 63a567bc2a672df0a5192bb8
 *         date:
 *           type: string
 *           format: date
 *           example: 2023-01-03T05:28:43.667Z
 *         description:
 *           type: string
 *           example: I am a manager for Africa Smart Investments and I want to meet to discuss a pending project
 *         hiring:
 *           type: boolean
 *           default: false
 *           example: true
 *         __v:
 *           type: integer
 *           default: 0
 *           example: 1
 */

route.post("/", messageValidation, MessageController.sendMessage);
/**
 * @swagger
 * /messages:
 *   post:
 *     tags:
 *       - Contact Messages
 *     summary: posting messages from contact page
 *     description: posting messages from contact page
 *     requestBody:
 *       description: Post a message to connect from contact page
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ngabo Solennel
 *               email:
 *                 type: string
 *                 format: email
 *                 example: ngsol@gmail.com
 *               message:
 *                 type: string
 *                 example: first swagger comment
 *               description:
 *                 type: string
 *                 example: I am a manager for Africa Smart Investments and I want to meet to discuss a pending project
 *               hiring:
 *                 type: boolean
 *                 default: false
 *                 example: true
 *             required:
 *               - name
 *               - email
 *               - message
 *       required: true
 *     responses:
 *       '200':
 *         description: Success
 *       '500':
 *         description: Internal server error
 */

route.get(
  "",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.viewMessages
);
/**
 * @swagger
 * /messages:
 *    get:
 *       tags:
 *         - Contact Messages
 *       summary: Get all messages sent from contact page
 *       description: Get all messages sent from contact page
 *       operationId: getMessages
 *       responses:
 *         '200':
 *           description: Success
 *         '404':
 *           description: No messages found
 *         '500':
 *           description: Internal server error
 *       security:
 *         - {}
 *         - bearerAuth: []
 */

route.get(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.viewSingleMessage
);

/**
 * @swagger
 * /messages/{messageId}:
 *   get:
 *     tags:
 *       - Contact Messages
 *     summary: Get one message sent from contact page
 *     description: Get one message sent from contact page
 *     operationId: getSingleMessage
 *     parameters:
 *       - name: messageId
 *         in: path
 *         description: ID of the message
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *           example: id
 *     responses:
 *       '200':
 *         description: Success
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: No message found
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */
route.delete(
  "/:id",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  MessageController.deleteMessage
);
/**
 * @swagger
 * /messages/{messageId}:
 *    delete:
 *       tags:
 *         - Contact Messages
 *       summary: Delete a message sent from contact page
 *       description: Deletemessage sent from contact page
 *       operationId: deleteMessage
 *       parameters:
 *         - name: messageId
 *           in: path
 *           description: ID of the message
 *           required: true
 *           schema:
 *             type: string
 *             format: objectId
 *             example: id
 *       responses:
 *         '200':
 *           description: Success
 *       '401':
 *         description: Unauthorized
 *         '500':
 *           description: Internal server error
 *       security:
 *         - {}
 *         - bearerAuth: []
 */
export default route;

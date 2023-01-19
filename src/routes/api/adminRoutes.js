import { adminValidation } from "../../middleware/auth/validations";
import express from "express";
import { AdminController } from "../../controller/adminController";
import passport from "passport";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();
/**
 * @swagger
 * tags:
 * - name: Blogs
 *   description: Everything about interacting with blogs
 * - name: Contact Messages
 *   description: Accessing messages sent on the contact page
 * - name: Users
 *   description: Operations about user
 * - name: Admin
 *   description: Adding an administrator
 */

route.post(
  "/signup",
  checkAdmin,
  adminValidation,
  passport.authenticate("jwt", { session: false }),
  AdminController.addAdmin
);

/**
 * @swagger
 * /admin/signup:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Signing up an administrator
 *     description: Signing up an administrator
 *     operationId: adminSignup
 *     requestBody:
 *         description: Body to signup an admin (need name,email,password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Ngabo Sol
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: ngsol@gmail.com
 *               required:
 *                 - name
 *                 - email
 *     responses:
 *       "200":
 *           description: Success
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad Request
 *       "409":
 *           description: Conflict
 *       '500':
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */

route.get(
  "",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  AdminController.getAdmin
);
/**
 * @swagger
 * /admin:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Getting all admins
 *     description: Getting all admins
 *     operationId: getAdmins
 *     responses:
 *       "200":
 *         description: Success
 *       '401':
 *         description: Unauthorized
 *       "500":
 *         description: Internal server error
 *     security:
 *       - {}
 *       - bearerAuth: []
 */
export default route;

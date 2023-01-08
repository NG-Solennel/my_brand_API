import {
  userValidation,
  loginValidation,
} from "../../middleware/auth/validations";
import express from "express";
import { AdminController } from "../../controller/adminController";
import passport from "passport";
import checkAdmin from "../../middleware/auth/checkAdmin";
const route = express.Router();

route.post(
  "/signup",
  checkAdmin,
  userValidation,
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
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: andela
 *               required:
 *                 - name
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: Successful Operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: "Admin sign up was successfull!!"
 *       "409":
 *           description: Conflict
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: "Email exists"
 *       '500':
 *         description: Internal server error
 */

route.get(
  "",
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   Administrators:
 *                     type: array
 *                     minItems: 2
 *                     items:
 *                       $ref: '#/components/schemas/User'
 *       "500":
 *         description: Internal server error
 */
export default route;

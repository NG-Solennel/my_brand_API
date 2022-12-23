import express from "express";
import { UserController } from "../../controller/userController";
import passport from "passport";
// import isLogged from "../../middleware/auth/googleMid";
import checkAdmin from "../../middleware/auth/checkAdmin";
import {
  userValidation,
  loginValidation,
} from "../../middleware/auth/validations";
const route = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      User:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            format: objectId
 *            example: 63a14e44f08ce9c0f90689fe
 *          name:
 *            type: string
 *            example: Ngabo Sol
 *          email:
 *            type: string
 *            format: email
 *            example: ngsol@gmail.com
 *          password:
 *            type: string
 *            format: password
 *            example: andela
 *          __v:
 *            type: integer
 *            example: 0
 */

route.post(
  "/signup",
  userValidation,
  passport.authenticate("jwt", { session: false }),
  UserController.addUser
);
/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags:
 *       - Users
 *     summary: Signing up a user
 *     description: Signing up a user
 *     operationId: userSignup
 *     requestBody:
 *         description: Body to signup a user (need name,email,password)
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
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     default: "User was signed up successfully!!"
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

route.post("/login", loginValidation, UserController.login);
/**
 * @swagger
 *   /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logging in a user
 *     description: Logging in a user
 *     operationId: userlogin
 *     requestBody:
 *         description: Body for the login request (need email and password)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: ngsol@gmail.com
 *                 password:
 *                   type: string
 *                   format: password
 *                   example: andela
 *               required:
 *                 - email
 *                 - password
 *     responses:
 *       "200":
 *           description: successful operation
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: Solennel
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTE0ZTQ0ZjA4Y2U5YzBmOTA2ODlmZSIsImVtYWlsIjoibmdzb2xlbm5lbEBnbWFpbC5jb20iLCJuYW1lIjoiU29sZW5uZWwiLCJpYXQiOjE2NzMwOTM0OTJ9.0H_ur93ZV3egRVI2el4iOdCSfDAy-Uwh_owEMLx9uWk
 *     '500':
 *        description: Internal server error
 */

// route.get(
//   "/googleLogin",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );
// route.get("/signup", (req, res) => {
//   res.json({ message: "Not Authorized" });
// });
// route.get("/login", isLogged);
// route.get(
//   "/googleLogin/redirect",
//   passport.authenticate("google", {
//     successRedirect: "/api/v1/users/login",
//     failureRedirect: "/api/v1/users/signup",
//   })
// );

route.get(
  "",
  checkAdmin,
  passport.authenticate("jwt", { session: false }),
  UserController.getUsers
);

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Getting all users
 *     description: Getting all users
 *     operationId: getUsers
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                   users:
 *                     type: array
 *                     minItems: 2
 *                     items:
 *                       $ref: '#/components/schemas/User'
 *       "500":
 *         description: Internal server error
 */

export default route;

import express from "express";
import { UserController } from "*/controllers/user.controller";
import { UserValidation } from "*/validations/user.validation";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = express.Router();

/**
 * - To do
 * Register
 * Login
 * After login, show all board
 */

router.route("/").get(verifyToken, UserController.check);

router
    .route("/register")
    .post(UserValidation.createNew, UserController.createNew);

router.route("/login").post(UserValidation.login, UserController.login);

export const authRoutes = router;

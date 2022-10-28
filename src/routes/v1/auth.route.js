import express from "express";
import { UserController } from "*/controllers/user.controller";
import { UserValidation } from "*/validations/user.validation";

const router = express.Router();

/**
 * - To do
 * Register
 * Login
 * After login, show all board
 */

router
    .route("/register")
    .post(UserValidation.createNew, UserController.createNew);

router.route("/login").post(UserValidation.login, UserController.login);

export const authRoutes = router;

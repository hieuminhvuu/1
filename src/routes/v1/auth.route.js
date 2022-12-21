import express from "express";
import { UserController } from "*/controllers/user.controller";
import { UserValidation } from "*/validations/user.validation";
import { verifyToken } from "../../middlewares/auth.middleware";

const router = express.Router();

router.route("/").get(verifyToken, UserController.check);

router
    .route("/:id")
    .put(UserValidation.update, verifyToken, UserController.update);

router
    .route("/register")
    .post(UserValidation.createNew, UserController.createNew);

router.route("/login").post(UserValidation.login, UserController.login);

export const authRoutes = router;

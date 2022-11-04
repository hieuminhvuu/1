import express from "express";
import { CardController } from "*/controllers/card.controller";
import { CardValidation } from "*/validations/card.validation";
import { verifyToken } from "*/middlewares/auth.middleware";

const router = express.Router();

router
    .route("/")
    .post(CardValidation.createNew, verifyToken, CardController.createNew);

router
    .route("/:id")
    .put(CardValidation.update, verifyToken, CardController.update);

export const cardRoutes = router;

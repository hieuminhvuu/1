import express from "express";
import { BoardController } from "*/controllers/board.controller";
import { BoardValidation } from "*/validations/board.validation";
import { verifyToken } from "*/middlewares/auth.middleware";

const router = express.Router();

router
    .route("/")
    .post(BoardValidation.createNew, verifyToken, BoardController.createNew)
    .get(verifyToken, BoardController.getAllBoard)
    .delete(
        BoardValidation.deleteBoard,
        verifyToken,
        BoardController.deleteBoard
    );

router
    .route("/:id")
    .get(verifyToken, BoardController.getFullBoard)
    .put(BoardValidation.update, verifyToken, BoardController.update);

export const boardRoutes = router;

import express from "express";
import { ColumnController } from "*/controllers/column.controller";
import { ColumnValidation } from "*/validations/column.validation";
import { verifyToken } from "*/middlewares/auth.middleware";

const router = express.Router();

router
    .route("/")
    .post(ColumnValidation.createNew, verifyToken, ColumnController.createNew);

router
    .route("/:id")
    .put(ColumnValidation.update, verifyToken, ColumnController.update);

export const columnRoutes = router;

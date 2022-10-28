import express from "express";
import { HttpStatusCode } from "*/utilities/constants";
import { boardRoutes } from "./board.route";
import { columnRoutes } from "./column.route";
import { cardRoutes } from "./card.route";
import { authRoutes } from "./auth.route";

const router = express.Router();

/**
 * Get v1/status
 */
router.get("/status", (req, res) =>
    res.status(HttpStatusCode.OK).json({ status: "Ok" })
);

/**
 * Auth APIs
 */
router.use("/auth", authRoutes);

/**
 * Board APIs
 */
router.use("/boards", boardRoutes);

/**
 * Column APIs
 */
router.use("/columns", columnRoutes);

/**
 * Card APIs
 */
router.use("/cards", cardRoutes);

export const apiV1 = router;

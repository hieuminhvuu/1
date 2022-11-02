import jwt from "jsonwebtoken";
import { HttpStatusCode } from "*/utilities/constants";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json({ success: false, message: "Access token not found!" });
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            console.log(error);
            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json({ success: false, message: "Invalid token!" });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(HttpStatusCode.INTERNAL_SERVER)
            .json({ success: false, message: error.message });
    }
};

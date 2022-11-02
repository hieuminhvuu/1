import { HttpStatusCode } from "*/utilities/constants";
import { UserService } from "*/services/user.service";

const check = async (req, res) => {
    try {
        const user = await UserService.check(req.body);
        res.status(HttpStatusCode.OK).json({ success: true, user });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            success: false,
            errors: error.message,
        });
    }
};

const createNew = async (req, res) => {
    try {
        const result = await UserService.createNew(req.body);
        res.status(HttpStatusCode.OK).json({ success: true, ...result });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            success: false,
            errors: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const result = await UserService.login(req.body);
        res.status(HttpStatusCode.OK).json({
            success: result.success,
            ...result,
        });
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            success: false,
            errors: error.message,
        });
    }
};

export const UserController = {
    createNew,
    login,
    check,
};

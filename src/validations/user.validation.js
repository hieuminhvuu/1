import Joi from "joi";
import { HttpStatusCode } from "*/utilities/constants";

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        firstName: Joi.string().required().min(1).max(20).trim(),
        lastName: Joi.string().required().min(1).max(20).trim(),
        email: Joi.string().required().min(5).max(30).trim(),
        password: Joi.string().required().min(6).trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        });
    }
};

const login = async (req, res, next) => {
    const condition = Joi.object({
        email: Joi.string().required().min(5).max(30).trim(),
        password: Joi.string().required().min(6).trim(),
    });
    try {
        await condition.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        });
    }
};

export const UserValidation = { createNew, login };

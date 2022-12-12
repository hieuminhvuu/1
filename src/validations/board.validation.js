import Joi from "joi";
import { HttpStatusCode } from "*/utilities/constants";

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        userId: Joi.string().required(),
        title: Joi.string().required().min(1).max(20).trim(),
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

// Now just validate only userId, maybe after need more info !!!
const deleteBoard = async (req, res, next) => {
    const condition = Joi.object({
        userId: Joi.string().required(),
        id: Joi.string().required(),
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

const update = async (req, res, next) => {
    const condition = Joi.object({
        title: Joi.string().required().min(3).max(20).trim(),
    });
    try {
        await condition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true,
        });
        next();
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            errors: new Error(error).message,
        });
    }
};

export const BoardValidation = { createNew, update, deleteBoard };

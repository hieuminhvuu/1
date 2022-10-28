import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "*/config/mongodb";

const userCollectionName = "users";
const userCollectionSchema = Joi.object({
    firstName: Joi.string().required().min(1).max(20).trim(),
    lastName: Joi.string().required().min(1).max(20).trim(),
    email: Joi.string().required().min(5).max(30).trim(),
    password: Joi.string().required().min(6).trim(),
    avatar: Joi.string().default(
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    ),
    boardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
});

const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(userCollectionName)
            .findOne({ _id: ObjectId(id) });
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const createNew = async (data) => {
    try {
        const validatedValue = await validateSchema(data);
        const insertValue = {
            ...validatedValue,
        };
        const result = await getDB()
            .collection(userCollectionName)
            .insertOne(insertValue);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 *
 * @param {string} userId
 * @param {string} boardId
 */
const pushBoardOrder = async (userId, boardId) => {
    try {
        const result = await getDB()
            .collection(userCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(userId) },
                { $push: { boardOrder: boardId } },
                { returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const UserModel = {
    userCollectionName,
    createNew,
    pushBoardOrder,
    findOneById,
};

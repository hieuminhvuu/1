import Joi from "joi";
import { ObjectId } from "mongodb";
import { getDB } from "*/config/mongodb";
import { ColumnModel } from "./column.model";
import { CardModel } from "./card.model";

// Define Board collection
const boardCollectionName = "boards";
const boardCollectionSchema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required().min(1).max(20).trim(),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
});

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, {
        abortEarly: false,
    });
};

const findOneById = async (id) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
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
            userId: ObjectId(validatedValue.userId),
        };
        const result = await getDB()
            .collection(boardCollectionName)
            .insertOne(insertValue);
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const deleteBoard = async (data) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndDelete({ _id: ObjectId(data.id) });
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 *
 * @param {string} boardId
 * @param {string} columnId
 */
const pushColumnOrder = async (boardId, columnId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(boardId) },
                { $push: { columnOrder: columnId } },
                { returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

const getFullBoard = async (boardId) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                {
                    $match: {
                        _id: ObjectId(boardId),
                        _destroy: false,
                    },
                },
                {
                    $lookup: {
                        from: ColumnModel.columnCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "columns",
                    },
                },
                {
                    $lookup: {
                        from: CardModel.cardCollectionName,
                        localField: "_id",
                        foreignField: "boardId",
                        as: "cards",
                    },
                },
            ])
            .toArray();
        return result[0] || {};
    } catch (error) {
        throw new Error(error);
    }
};

const getAllBoard = async (req) => {
    try {
        const result = await getDB()
            .collection(boardCollectionName)
            .aggregate([
                {
                    $match: {
                        userId: ObjectId(req.userId),
                        _destroy: false,
                    },
                },
            ])
            .toArray();
        return result;
    } catch (error) {
        throw new Error(error);
    }
};

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
        };
        if (data.userId) {
            updateData.userId = ObjectId(data.userId);
        }
        const result = await getDB()
            .collection(boardCollectionName)
            .findOneAndUpdate(
                { _id: ObjectId(id) },
                { $set: updateData },
                { returnDocument: "after" }
            );
        return result.value;
    } catch (error) {
        throw new Error(error);
    }
};

export const BoardModel = {
    createNew,
    pushColumnOrder,
    getFullBoard,
    update,
    findOneById,
    getAllBoard,
    deleteBoard,
};

import { UserModel } from "*/models/user.model";
import { cloneDeep } from "lodash";
import { BoardModel } from "../models/board.model";

const createNew = async (data) => {
    try {
        const createdUser = await UserModel.createNew(data);
        const getNewUser = await UserModel.findOneById(
            createdUser.insertedId.toString()
        );
        return getNewUser;
    } catch (error) {
        throw new Error(error);
    }
};

export const UserService = { createNew };

import { getDB } from "*/config/mongodb";
import { UserModel, userCollectionName } from "*/models/user.model";
import argon2 from "argon2";
import { HttpStatusCode } from "*/utilities/constants";

const createNew = async (data) => {
    try {
        const result = await getDB()
            .collection("users")
            //.collection(userCollectionName)
            .findOne({ email: data.email });

        if (result) {
            return {
                message: "Email is already taken",
            };
        }
        const hashedPassword = await argon2.hash(data.password);
        const userData = {
            ...data,
            password: hashedPassword,
        };
        const createdUser = await UserModel.createNew(userData);
        const getNewUser = await UserModel.findOneById(
            createdUser.insertedId.toString()
        );
        return getNewUser;
    } catch (error) {
        throw new Error(error);
    }
};

export const UserService = { createNew };

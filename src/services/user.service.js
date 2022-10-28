import { getDB } from "*/config/mongodb";
import { UserModel, userCollectionName } from "*/models/user.model";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

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

const login = async (data) => {
    try {
        const { email, password } = data;

        // Check for existing user
        const user = await getDB()
            .collection("users")
            //.collection(userCollectionName)
            .findOne({ email });
        if (!user) {
            return {
                result: false,
                massage: "Email is not registered !",
                data: "",
            };
        }

        // User found -> check password
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return {
                result: false,
                massage: "Password incorrect ",
                data: "",
            };
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return {
            result: true,
            massage: "Login successfully !",
            data: { user, token },
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const UserService = { createNew, login };

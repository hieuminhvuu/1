import { getDB } from "*/config/mongodb";
import { UserModel, userCollectionName } from "*/models/user.model";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const check = async (data) => {
    try {
        let success = false;
        const result = await getDB()
            .collection("users")
            //.collection(userCollectionName)
            .findOne({ _id: ObjectId(data.id) })
            .select("-password");
        if (!result) {
            return {
                success: success,
                massage: "User not found!",
            };
        }
        success = true;
        return {
            success: success,
            massage: "User found.",
            result,
        };
    } catch (error) {
        throw new Error(error);
    }
};

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
        let success = false;
        // Check for existing user
        const user = await getDB()
            .collection("users")
            //.collection(userCollectionName)
            .findOne({ email });
        if (!user) {
            return {
                success: success,
                massage: "Email is not registered !",
                data: "",
            };
        }

        // User found -> check password
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid) {
            return {
                success: success,
                massage: "Password incorrect ",
                data: "",
            };
        }
        success = true;

        const token = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        return {
            success: success,
            massage: "Login successfully !",
            data: { user, token },
        };
    } catch (error) {
        throw new Error(error);
    }
};

export const UserService = { createNew, login, check };

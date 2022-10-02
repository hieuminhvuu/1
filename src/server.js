import express from "express";
import { env } from "*/config/environment";
import { connectDB, getDB } from "*/config/mongodb";

connectDB()
    .then(() => console.log("Connected successfully to data"))
    .then(() => bootServer())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();

    app.get("/test", async (req, res) => {
        res.end("<h1>Hello world!</h1><hr/>");
    });

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(
            `Hello Hieu, I'm running at ${env.APP_HOST}:${env.APP_PORT}`
        );
    });
};

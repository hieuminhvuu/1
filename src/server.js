import express from "express";
import { env } from "*/config/environment";
import { connectDB, getDB } from "*/config/mongodb";
import { apiV1 } from "*/routes/v1";

connectDB()
    .then(() => console.log("Connected successfully to data"))
    .then(() => bootServer())
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

const bootServer = () => {
    const app = express();

    // Enable req.body data
    app.use(express.json());

    // Use APIs v1
    app.use("/v1", apiV1);

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(
            `Hello Hieu, I'm running at ${env.APP_HOST}:${env.APP_PORT}`
        );
    });
};

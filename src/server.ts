import express from "express";
import apiRouter from "./endpoints";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "database";

dotenv.config();
const { NODE_ENV, PORT, MONGO_PORT, MONGO_TABLE } = process.env;

const startServer = async (): Promise<void> => {
  try {
    const app = express();

    app.disable("x-powered-by");
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/", apiRouter);

    if (!MONGO_PORT || !MONGO_TABLE) {
      throw Error("Invalid env settings");
    }

    try {
      await connectToDb(MONGO_PORT, MONGO_TABLE);
    } catch (error) {
      throw new Error("Could not connect to db");
    }

    app.listen(PORT, () =>
      console.log(`Server running in ${NODE_ENV} at port ${PORT}`)
    );
  } catch (error) {
    console.error("Error starting server...");
    console.log(error);
  }
};

startServer();

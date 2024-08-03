import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/router.js";

const expressApp = express();

expressApp.use(express.json());
expressApp.use(cookieParser());
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(cors());
expressApp.use("/", router);

export default expressApp;

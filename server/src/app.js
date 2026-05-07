import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import profileRouter from "./routes/profile.router.js";
import requestRouter from "./routes/request.router.js";
import authRouter from "./routes/auth.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);

export default app;

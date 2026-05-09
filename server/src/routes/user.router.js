import { Router } from "express";
import mongoose from "mongoose";
import userAuth from "../middlewares/auth.middleware.js";
import Connections from "../model/connection.model.js";

const userRouter = Router();

userRouter.get("/requests", userAuth, async (req, res) => {
  const user = req.user;

  const connctionRequest = await Connections.find({
    toUserId: user._id,
    status: "intrested",
  });

  res.status(200).json({
    message: "All requests has fetched successfully",
    connctionRequest,
  });
});

export default userRouter;

import { Router } from "express";
import mongoose from "mongoose";
import userAuth from "../middlewares/auth.middleware.js";
import Connections from "../model/connection.model.js";

const USER_DATA = "firstName photoUrl age skills about gender";

const userRouter = Router();

userRouter.get("/requests", userAuth, async (req, res) => {
  const user = req.user;

  const connctionRequest = await Connections.find({
    toUserId: user._id,
    status: "intrested",
  }).populate("fromUserId", USER_DATA);

  res.status(200).json({
    message: "All requests has fetched successfully",
    connctionRequest,
  });
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const connections = await Connections.find({
      $or: [
        { fromUserId: user._id, status: "accepted" },
        { toUserId: user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() === user._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    
    return res.status(200).json({
      message: "All connected users",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default userRouter;

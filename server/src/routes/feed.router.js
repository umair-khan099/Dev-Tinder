import { Router } from "express";
import Connections from "../model/connection.model.js";
import userAuth from "../middlewares/auth.middleware.js";
import User from "../model/user.model.js";
import { USER_DATA } from "./user.router.js";
const feedRouter = Router();

feedRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;
    limit = limit > 20 ? 20 : limit;
    const skip = (page - 1) * limit;
    const connections = await Connections.find({
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    }).select("fromUserId toUserId");

    const hiddenUserFromFeed = new Set();

    connections.forEach((req) => {
      hiddenUserFromFeed.add(req.fromUserId.toString());
      hiddenUserFromFeed.add(req.toUserId.toString());
    });

    const feddUSers = await User.find({
      _id: { $nin: Array.from(hiddenUserFromFeed) },
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);
    return res.status(201).json({
      message: "user feed",
      feddUSers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export default feedRouter;

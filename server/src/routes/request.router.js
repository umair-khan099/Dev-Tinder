import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import ConnectionRequest from "../model/connection.model.js";

const requestRouter = Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.status(201).json({
      message: "connectionRequest sent successesfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default requestRouter;

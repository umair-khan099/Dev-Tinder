  import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import ConnectionRequest from "../model/connection.model.js";
import User from "../model/user.model.js";

const requestRouter = Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const userId = await User.findById(toUserId);

    if (!userId) {
      return res.status(400).json({
        message: "User Not Exist ",
      });
    }

    if (fromUserId == toUserId) {
      return res.status(400).json({
        message: "ree babu waah apne ko hi request bhej ra hai waah",
      });
    }

    const ALLOWED_STATUS = ["ignore", "intrested"];

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        message: "not Allowed Status",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        message: "Connection Request Already Exist",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();
    res.status(201).json({
      message: `${req.user.firstName} is ${status} in ${userId.firstName}`,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

requestRouter.post("/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { status, requestId } = req.params;

    const ALLOWED_STATUS = ["accepted", "rejected"];

    if (!ALLOWED_STATUS.includes(status)) {
      return res.status(404).json({
        message: "Action not allowed",
      });
    }

    const Connection = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: user._id,
      status: "intrested",
    });

    if (!Connection) {
      return res.status(400).json({
        message: "There is no connection",
      });
    }

    Connection.status = status;

    const data = await Connection.save();

    return res.status(400).json({
      message: `connection has ${status} , ${data}  `,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
export default requestRouter;

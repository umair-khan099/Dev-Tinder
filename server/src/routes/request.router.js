import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";

const requestRouter = Router();

requestRouter.post("/sendConnection", userAuth, async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: `${user.firstName} has send Request`,
  });
});

export default requestRouter;

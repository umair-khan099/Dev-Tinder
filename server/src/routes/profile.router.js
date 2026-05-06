import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";

const profileRouter = Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Welcome Back",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

profileRouter.patch("/updateuser/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isAllowedUpdate = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key),
    );

    if (!isAllowedUpdate) {
      return res.status(400).json({
        message: "update is not allowed",
      });
    }

    if (data.skills.length > 10) {
      res.status(400).json({
        message: "kuchh jyada hi skill wala bnn ra hai kya +",
      });
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });

    res.send("user created succssfully ", { user });
  } catch (error) {
    res.status(400).json({
      error: message,
    });
  }
});

export default profileRouter;

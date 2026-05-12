import { Router } from "express";
import userAuth from "../middlewares/auth.middleware.js";
import User from "../model/user.model.js";

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

profileRouter.patch("/edit", userAuth, async (req, res) => {
  const user = req.user;
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

    if (data.skills?.length > 10) {
      res.status(400).json({
        message: "kuchh jyada hi skill wala bnn ra hai kya +",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(user.id, data, {
      returnDocument: "after",
    });

    res.status(201).json({
      message: "user updated succssfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

export default profileRouter;

import { Router } from "express";
import { validateSignUp } from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { firstName, password, email, photoUrl, skills, about, gender, age } =
      req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    let user = new User({
      firstName,
      email,
      password: hashPassword,
      photoUrl,
      skills,
      about,
      gender,
      age,
    });
    await user.save();

    console.log(req.body);
    console.log(req.body.skills);
    console.log(Array.isArray(req.body.skills));
    res.status(201).json({
      message: "user added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid Cridatials",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found please register first",
      });
    }
    const verify = await user.validatePassword(password);
    if (!verify) {
      return res.status(400).json({
        message: "Incorrect password try again",
      });
    }
    const token = await user.getJWT();
    res.cookie("token", token);
    return res.status(200).json({
      message: "User has logged in successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(201).json({
      message: "log out successfully ",
    });
  } catch (error) {
    message: error.message;
  }
});

export default authRouter;

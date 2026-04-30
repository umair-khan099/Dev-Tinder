import express from "express";
import dotenv from "dotenv";
import User from "./model/user.model.js";
import { validateSignUp } from "./utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userAuth from "./middlewares/auth.middleware.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignUp(req);
    const { password, firstName, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let user = new User({ firstName, email, password: hashPassword });

    await user.save();

    res.send("user added successfully", {
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/login", async (req, res) => {
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
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      return res.status(400).json({
        message: "Incorrect password try again",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    return res.status(200).json({
      message: "User has logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Welcome Back",
      user,
    });
  } catch (error) {}
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.patch("/updateuser/:userId", async (req, res) => {
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

export default app;

import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      res.status(401).json({
        message: "No Token Provided",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong at Auth MiddleWare",
    });
  }
};

export default userAuth;

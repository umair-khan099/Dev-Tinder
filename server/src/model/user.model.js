import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    password: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
  },
  photoUrl: {
    type: String,
    default:
      "https://imgs.search.brave.com/rwE-hC6ESt3hBJZhImPkb-KvU26bLDKVe-OKv1y50-M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzE0LzQz/LzU1LzE0NDM1NWQ3/YjM2YzVmNjQ2NDM1/NDIzNzk4MjgxY2U5/LmpwZw",
  },
  about: {
    type: String,
    default: "a default about",
    maxLength: 250,
  },
  skills: {
    type: [String],
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

export default User;

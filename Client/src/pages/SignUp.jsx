import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const SignUp = ({ isLogin, setisLogin }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.user));
      setisLogin(true);
      console.log(res);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-md border border-black rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">First Name</label>

              <input
                type="text"
                value={firstName}
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
                className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Last Name</label>

              <input
                type="text"
                value={lastName}
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
                className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>

            <input
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmailId(e.target.value)}
              className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Password</label>

            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white rounded-lg py-2 text-sm hover:opacity-90 transition"
          >
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already Have An Account{" "}
            <span
              onClick={() => setisLogin(!isLogin)}
              className="text-blue-500 cursor-pointer"
            >
              login
            </span>
          </p>
        </form>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-medium">
          User Registered Successfully
        </div>
      )}
    </div>
  );
};

export default SignUp;

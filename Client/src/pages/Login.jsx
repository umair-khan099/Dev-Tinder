import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () =>{
    const data = axios.post()
  }


  return (
    <div className="py-8 flex items-center justify-center bg-gray-100 px-4 ">
      <form className="w-full max-w-sm bg-white shadow-md rounded-2xl p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>

        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-600 mb-2">Email</label>

          <input
            value={email}
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-6">
          <label className="text-sm text-gray-600 mb-2">Password</label>

          <input
            value={password}
            type="password"
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-full bg-black text-white py-2.5 rounded-lg hover:opacity-90 transition duration-200">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

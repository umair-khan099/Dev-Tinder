import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + _id,
      {},
      { withCredentials: true },
    );
    dispatch(removeFeed(_id));
  };

  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;
  console.log(user);
  return (
    <div className="flex justify-center items-center min-h-150  text-white px-4">
      <div className="bg-zinc-900 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
        <img
          src={photoUrl}
          alt="profile"
          className="w-full h-80 object-cover"
        />

        <div className="p-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {firstName}, {age}
            </h1>

            <span className="text-sm text-zinc-400 capitalize">{gender}</span>
          </div>

          <p className="text-zinc-300 mt-3 text-sm leading-relaxed">{about}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-white text-black text-xs px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => handleSendRequest("ignore", user._id)}
              className="w-1/2 border border-white py-2 rounded-xl font-semibold hover:bg-red-800 hover:text-white transition"
            >
              Ignore
            </button>

            <button
              onClick={() => handleSendRequest("intrested", user._id)}
              className="w-1/2 border border-white text-white py-2 rounded-xl font-semibold hover:bg-green-300 transition"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

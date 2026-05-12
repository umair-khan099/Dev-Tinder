import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setskills] = useState(user.skills.join(", "));
  const [error, seterror] = useState("");
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          gender,
          about,
          skills: skills.split(",").map((skill) => skill.trim()),
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.updatedUser));
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center">
      <div className="h-[80vh] bg-white text-black flex justify-center items-center px-4">
        <div className="w-full max-w-md border border-black rounded-2xl p-5">
          <h1 className="text-xl font-semibold mb-5 text-center">
            Edit Profile
          </h1>

          <form className="flex flex-col gap-3">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First name"
                  className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last name"
                  className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Photo URL</label>
              <input
                type="text"
                value={photoUrl}
                placeholder="Enter photo URL"
                className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                onChange={(e) => setphotoUrl(e.target.value)}
              />
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Age</label>
                <input
                  type="number"
                  value={age}
                  placeholder="Age"
                  className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">Gender</label>
                <select
                  value={gender}
                  className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">About</label>
              <textarea
                value={about}
                rows="2"
                placeholder="Write something..."
                className="border border-black rounded-lg px-3 py-2 text-sm outline-none resize-none focus:ring-1 focus:ring-black"
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Skills</label>
              <input
                value={skills}
                type="text"
                placeholder="MERN, C++, AI..."
                className="border border-black rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                onChange={(e) => setskills(e.target.value)}
              />
            </div>

            {/* Button */}
            <button
              onClick={saveProfile}
              type="submit"
              className="bg-black text-white rounded-lg py-2 text-sm mt-1 hover:opacity-90 transition"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
      <div>
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            photoUrl,
            gender,
            about,
            skills: skills.split(",").map((skill) => skill.trim()),
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;

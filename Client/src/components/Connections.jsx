import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-black">
        <h1 className="text-sm tracking-wide">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-2xl mx-auto">
        <div className="py-5 border-b border-zinc-200">
          <h1 className="text-xl font-semibold tracking-tight">Connections</h1>
        </div>

        <div className="flex flex-col">
          {connections.map((user) => (
            <div
              key={user._id}
              className=" flex items-center justify-between py-4 border-b border-zinc-200 transition-all duration-200 hover:bg-zinc-100 "
            >
              {/* left */}
              <div className="flex items-center gap-3">
                <img
                  src={user.photoUrl}
                  alt="profile"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="space-y-[2px]">
                  <h2 className="text-sm font-semibold">{user.firstName}</h2>

                  <p className="text-xs text-zinc-500 max-w-xs">{user.about}</p>

                  {user.skills && user.skills.length > 0 && (
                    <p className="text-[11px] text-zinc-400">
                      {user.skills.join(" • ")}
                    </p>
                  )}
                </div>
              </div>

              {/* right */}
              <button className=" text-xs px-4 py-2 rounded-full border border-zinc-300 bg-white hover:border-zinc-500 transition-all duration-200">
                Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;

import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requests";

const Requests = () => {
  const allRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.connctionRequest));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!allRequests) return null;

  if (allRequests.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <h1 className="text-sm text-zinc-500 tracking-wide">
          No Requests Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="max-w-2xl mx-auto">
        <div className="py-5 border-b border-zinc-200">
          <h1 className="text-xl font-semibold tracking-tight">
            Connection Requests
          </h1>
        </div>

        <div className="flex flex-col">
          {allRequests.map((request) => {
            const user = request.fromUserId;

            return (
              <div
                key={request._id}
                className="flex items-center justify-between py-4 border-b border-zinc-200"
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

                    <p className="text-xs text-zinc-500 max-w-xs">
                      {user.about}
                    </p>

                    {user.skills?.length > 0 && (
                      <p className="text-[11px] text-zinc-400">
                        {user.skills.join(" • ")}
                      </p>
                    )}
                  </div>
                </div>

                {/* right */}
                <div className="flex items-center gap-2">
                  <button className=" text-xs px-4 py-2 rounded-full border border-zinc-300 bg-white hover:border-red-400 hover:text-red-500 transition-all duration-200">
                    Reject
                  </button>

                  <button
                    className=" text-xs px-4 py-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-700 transition-all duration-200
                    "
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;

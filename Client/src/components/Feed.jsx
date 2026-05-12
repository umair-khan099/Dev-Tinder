import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);
  const [next, setNext] = useState(0);

  const fetchFeed = async () => {
    if (users) return;
    try {
      const feed = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(feed.data.feedUsers));
      console.log(feed.data.feedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!users) return null;

  if (users.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold">
        No Users Found
      </div>
    );
  }

  const user = users[next];

  return (
    <div>
      <UserCard user={user} setNext={setNext} />
    </div>
  );
};

export default Feed;

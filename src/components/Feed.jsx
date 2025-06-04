import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!feed || !feed.data) {
      getFeed();
    }
  }, [feed]);

  if (!feed) return null;

  if (feed.data.length <= 0) {
    return (
      <div className="flex justify-center my-10 mb-40">
        <h1 className="text-bold text-2xl">No new accounts found!</h1>
      </div>
    );
  }

  return (
    feed?.data?.length > 0 && (
      <div className="flex justify-center my-10 mb-40">
        <UserCard
          key={feed?.data[0]._id}
          user={feed?.data[0]}
          preview={false}
        />
      </div>
    )
  );
};

export default Feed;

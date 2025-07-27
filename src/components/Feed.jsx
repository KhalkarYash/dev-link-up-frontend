import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./UserCard";
import { motion, AnimatePresence } from "framer-motion";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(true);

  const getFeed = useCallback(async () => {
    try {
      if (feed?.data) return;
      setLoading(true);
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [dispatch, feed?.data]);

  useEffect(() => {
    if (!feed || !feed.data) {
      getFeed();
    }
  }, [feed, getFeed]);

  const handleCardExit = () => {
    setShowCard(false);
    setTimeout(() => {
      getFeed();
      setShowCard(true);
    }, 400); // delay for animation
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!feed || feed.data?.length === 0) {
    return (
      <div className="flex justify-center py-10 min-h-screen pb-40 text-center">
        <h1 className="font-bold text-2xl text-[var(--color-muted)]">
          🎉 You&lsquo;re all caught up! <br />
          No new accounts for now.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10 pb-40 min-h-screen">
      <AnimatePresence>
        {showCard && (
          <motion.div
            key={feed.data[0]._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <UserCard
              user={feed.data[0]}
              preview={false}
              onAction={handleCardExit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Feed;

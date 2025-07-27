import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [loading, setLoading] = useState(true);
  const [buttonLoadingId, setButtonLoadingId] = useState(null);

  const getRequests = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const reviewRequests = async (status, id) => {
    try {
      setButtonLoadingId(id);
      await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      getRequests();
    } catch (err) {
      console.error(err);
    } finally {
      setButtonLoadingId(null);
    }
  };

  useEffect(() => {
    getRequests();
  }, [getRequests]);

  const skeletonCard = (
    <div className="animate-pulse bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl shadow-md p-5 my-5 mx-auto max-w-3xl flex flex-col md:flex-row items-center">
      <div className="w-28 h-28 bg-gray-300 rounded-full" />
      <div className="flex-1 text-left md:ml-6 mt-4 md:mt-0 space-y-2">
        <div className="w-1/2 h-4 bg-gray-300 rounded" />
        <div className="w-1/3 h-3 bg-gray-300 rounded" />
        <div className="w-2/3 h-3 bg-gray-300 rounded" />
        <div className="w-1/4 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-10 px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[var(--color-text)]">
          Connection Requests
        </h1>
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>{skeletonCard}</React.Fragment>
        ))}
      </div>
    );
  }

  if (requests?.data.length === 0) {
    return (
      <div className="flex justify-center min-h-screen items-center h-96 text-center">
        <h1 className="text-2xl font-semibold text-[var(--color-muted)]">
          No connection requests found!
        </h1>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[var(--color-text)]">
        Connection Requests
      </h1>

      <AnimatePresence>
        {requests?.data.map((request) => {
          const {
            photoUrl,
            firstName,
            lastName,
            age,
            gender,
            about,
            skills,
            _id: id,
          } = request?.fromUserId;
          console.log(skills);
          return (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--color-base)] border border-[var(--color-border)] rounded-xl shadow-md p-5 my-5 mx-auto max-w-3xl flex flex-col md:flex-row items-center"
            >
              <img
                src={photoUrl}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border border-[var(--color-border)]"
              />

              <div className="flex-1 text-left md:ml-6 mt-4 md:mt-0 space-y-1">
                <h2 className="text-xl font-bold text-[var(--color-text)]">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-[var(--color-muted)]">
                  {age && gender && `${age}, ${gender}`}
                </p>
                <p className="text-sm">{about}</p>
                <p className="text-sm italic text-[var(--color-accent)]">
                  {skills?.length ? skills.join(", ") : "No skills listed"}
                </p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0 md:ml-auto">
                <button
                  onClick={() => reviewRequests("rejected", id)}
                  className="bg-[var(--color-error)] hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                  disabled={buttonLoadingId === id}
                >
                  {buttonLoadingId === id ? (
                    <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Reject"
                  )}
                </button>
                <button
                  onClick={() => reviewRequests("accepted", id)}
                  className="bg-[var(--color-success)] hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                  disabled={buttonLoadingId === id}
                >
                  {buttonLoadingId === id ? (
                    <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Accept"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Requests;

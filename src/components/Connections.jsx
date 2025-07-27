import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="animate-pulse flex justify-between m-4 p-4 rounded-lg bg-base-300 w-[90%] md:w-[80%] lg:w-1/2 mx-auto">
    <div className="flex">
      <div className="w-20 h-20 rounded-full bg-gray-400" />
      <div className="ml-4 space-y-2">
        <div className="w-40 h-4 bg-gray-400 rounded"></div>
        <div className="w-24 h-3 bg-gray-400 rounded"></div>
        <div className="w-48 h-3 bg-gray-400 rounded"></div>
        <div className="w-32 h-3 bg-gray-400 rounded"></div>
      </div>
    </div>
    <div className="my-auto">
      <div className="btn w-20 h-10 bg-gray-400 rounded"></div>
    </div>
  </div>
);

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);

  const getConnections = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getConnections();
  }, [getConnections]);

  if (loading) {
    return (
      <div className="py-10 pb-40 min-h-screen">
        {[...Array(3)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!connections || connections.data.length === 0) {
    return (
      <div className="flex justify-center py-10 pb-40 min-h-screen">
        <h1 className="text-bold text-2xl text-[var(--color-text)]">
          No connections found!
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center py-10 pb-40 min-h-screen">
      <h1 className="text-bold text-4xl mb-8">Connections</h1>

      {connections.data.map((connection, index) => {
        if (!connection) return null;
        const {
          _id,
          photoUrl,
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
        } = connection;

        return (
          <motion.div
            key={_id}
            className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-[90%] md:w-[80%] lg:w-1/2 mx-auto shadow-md"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex">
              <img
                className="w-20 h-20 rounded-full object-cover"
                alt="Profile Photo"
                src={photoUrl}
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm">{age + ", " + gender}</p>
                )}
                <p className="text-sm mt-1">{about}</p>
                <p className="text-sm mt-1 italic text-gray-500">
                  {skills.join(", ")}
                </p>
              </div>
            </div>
            <div className="my-auto">
              <Link to={`/chat/${_id}`}>
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Connections;

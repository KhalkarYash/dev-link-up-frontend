import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return null;

  if ((connections?.data).length === 0) {
    return (
      <div className="flex justify-center my-10 mb-40">
        <h1 className="text-bold text-2xl">No connections found!</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 mb-40">
      <h1 className="text-bold text-4xl">Connections</h1>

      {(connections?.data).map((connection, index) => {
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
          <div
            key={index}
            className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-[90%] md:w-[80%] lg:w-1/2 mx-auto"
          >
            <div className="flex">
              <div>
                <img
                  className="w-20 h-20 rounded-full object-cover"
                  alt="Profile Photo"
                  src={photoUrl}
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <p>{skills.join(", ")}</p>
              </div>
            </div>
            <div className="my-auto">
              <Link to={"/chat/" + _id}>
                <button className="btn btn-primary">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;

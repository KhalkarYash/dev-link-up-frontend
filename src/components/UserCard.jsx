import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user, preview }) => {
  console.log(user);
  const { photoUrl, firstName, lastName, age, about, skills, gender } = user;
  const userStore = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log(userStore);

  const sendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed());
    } catch (err) {
      console.error(err);
    }
  };

  if (!userStore || userStore.length === 0) return null;

  return (
    <div className="card bg-base-300 w-96 shadow-sm h-max">
      <figure>
        <img
          src={photoUrl}
          className="w-full"
          alt={`${firstName}'s Profile Picture`}
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h1 className="card-title">{`${firstName} ${lastName}`}</h1>
          <h1 className="card-title">
            {`${age},
            ${
              (gender === "male" && "M") ||
              (gender === "female" && "W") ||
              (gender === "others" && "Other")
            }
            `}
          </h1>
        </div>
        <p className="text-center">{about}</p>
        <p className="text-xs text-gray-400 text-center">
          Skills: {skills.join(", ")}
        </p>
        {preview ? (
          <div className="card-actions justify-evenly mt-2">
            <button className="btn btn-primary">Ignore ❌</button>
            <button className="btn btn-secondary">Interested ✅</button>
          </div>
        ) : (
          <div className="card-actions justify-evenly mt-2">
            <button
              className="btn btn-primary"
              onClick={() => sendRequest("ignored", feed?.data[0]?._id)}
            >
              Ignore ❌
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => sendRequest("interested", feed?.data[0]?._id)}
            >
              Interested ✅
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequests = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("Request " + status);
      getRequests();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return null;

  if (requests?.data.length === 0) {
    return (
      <div className="flex justify-center my-10 mb-40">
        <h1 className="text-bold text-2xl">No requests found!</h1>
      </div>
    );
  }

  return (
    <div className="text-center my-10 mb-40">
      <h1 className="text-bold text-4xl">Connection Requests</h1>

      {(requests?.data).map((request) => {
        const { photoUrl, firstName, lastName, age, gender, about, skills } =
          request?.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                className="w-20 h-20 rounded-full object-cover"
                alt="Profile Photo"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 w-1/2">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
              <p>{skills}</p>
            </div>
            <div className="max-w-max">
              <button
                className="btn btn-primary mx-2"
                onClick={() =>
                  reviewRequests("rejected", requests?.data[0]?.fromUserId?._id)
                }
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() =>
                  reviewRequests("accepted", requests?.data[0]?.fromUserId?._id)
                }
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;

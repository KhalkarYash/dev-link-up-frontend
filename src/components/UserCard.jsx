import React from "react";

const UserCard = ({ user, preview }) => {
  console.log(user);
  const { photoUrl, firstName, lastName, age, about, skills, gender } = user;
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
            <button className="btn btn-primary">Ignore ❌</button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                console.log("Clicked!");
              }}
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

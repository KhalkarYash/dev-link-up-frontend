import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <div>
        <img src={user.data.photoUrl} className="rounded-full h-12" />
      </div>
    </div>
  );
};

export default Profile;

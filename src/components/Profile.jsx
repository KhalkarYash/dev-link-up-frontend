import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <p>user.photoUrl</p>
    </div>
  );
};

export default Profile;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.data?.firstName);
  const [lastName, setLastName] = useState(user?.data?.lastName);
  const [age, setAge] = useState(user?.data?.age);
  const [gender, setGender] = useState(user?.data?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl);
  const [about, setAbout] = useState(user?.data?.about);
  const [skills, setSkills] = useState(user?.data?.skills || []);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      console.log("start");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
      console.log("mid");
      dispatch(addUser(res.data));
      toast.success("Profile updated successfully! 🎉", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log("end");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
      toast.error("Profile update failed. ❌", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="md:flex justify-center my-10 mb-40">
      <div className="flex justify-center items-center mb-8 md:mb-0 md:mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Other</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  type="text"
                  placeholder="Type here"
                  className="textarea resize-none"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Skills</legend>
                <input
                  value={skills.join(", ")}
                  onChange={(e) =>
                    setSkills(
                      e.target.value.split(",").map((skill) => skill.trim())
                    )
                  }
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            {errorMessage.length > 0 && (
              <p className="text-red-600 text-center">{errorMessage}</p>
            )}
            <div className="card-actions justify-center mt-4">
              <button onClick={saveProfile} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:block">
      <UserCard
        user={{ firstName, lastName, age, skills, about, photoUrl, gender }}
        preview={true}
      />
      </div>
    </div>
  );
};

export default EditProfile;

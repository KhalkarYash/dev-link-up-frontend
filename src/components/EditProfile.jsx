import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import { addUser } from "../utils/userSlice";
import { FaSpinner, FaTimes } from "react-icons/fa";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const isPremium = user?.data?.isPremium;

  const [firstName, setFirstName] = useState(user?.data?.firstName || "");
  const [lastName, setLastName] = useState(user?.data?.lastName || "");
  const [age, setAge] = useState(user?.data?.age || "");
  const [gender, setGender] = useState(user?.data?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user?.data?.photoUrl || "");
  const [imageValid, setImageValid] = useState(true);
  const [about, setAbout] = useState(user?.data?.about || "");
  const [skills, setSkills] = useState(user?.data?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!photoUrl) return setImageValid(false);
    const img = new Image();
    img.src = photoUrl;
    img.onload = () => setImageValid(true);
    img.onerror = () => setImageValid(false);
  }, [photoUrl]);

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (s) => {
    setSkills(skills.filter((sk) => sk !== s));
  };

  const saveProfile = async () => {
    if (loading) return;

    if (!firstName || !lastName || !age || !gender || !about || !photoUrl) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 100) {
      setErrorMessage("Age must be between 13 and 100.");
      return;
    }

    if (!imageValid) {
      setErrorMessage("Profile picture URL is invalid or broken.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age: ageNum,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      toast.success("Profile updated successfully! 🎉", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      toast.error("Profile update failed. ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:flex justify-center py-10 pb-40 px-4 gap-10 relative">
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/60 flex justify-center items-center rounded-xl">
          <FaSpinner
            className="animate-spin text-4xl"
            style={{ color: "var(--color-primary)" }}
          />
        </div>
      )}

      {/* Form Section */}
      <div className="flex md:w-1/2 justify-center items-center mb-8">
        <div
          className="w-full max-w-md border rounded-2xl p-6 shadow-2xl"
          style={{
            backgroundColor: "var(--color-neutral)",
            borderColor: "var(--color-border)",
          }}
        >
          <h2
            className="text-2xl font-semibold text-center mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Edit Profile
          </h2>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
          >
            {[
              { label: "First Name", value: firstName, setter: setFirstName },
              { label: "Last Name", value: lastName, setter: setLastName },
              { label: "Age", value: age, setter: setAge, type: "number" },
              { label: "Photo URL", value: photoUrl, setter: setPhotoUrl },
            ].map(({ label, value, setter, type = "text" }, i) => (
              <fieldset
                key={i}
                className="flex flex-col transition-transform hover:scale-[1.02] duration-200"
              >
                <legend
                  className="text-sm mb-1"
                  style={{ color: "var(--color-muted)" }}
                >
                  {label}
                </legend>
                <input
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  type={type}
                  className="input"
                  style={{
                    backgroundColor: "var(--color-base)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-border)",
                  }}
                  placeholder={label}
                />
              </fieldset>
            ))}

            {/* Gender Dropdown */}
            <fieldset className="flex flex-col transition-transform hover:scale-[1.02] duration-200">
              <legend
                className="text-sm mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Gender
              </legend>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input"
                style={{
                  backgroundColor: "var(--color-base)",
                  color: "var(--color-text)",
                  borderColor: "var(--color-border)",
                }}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </fieldset>

            {/* About */}
            <fieldset className="flex flex-col hover:scale-[1.02] transition-transform duration-200">
              <legend
                className="text-sm mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                About
              </legend>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea resize-none"
                placeholder="Tell us about yourself"
                style={{
                  backgroundColor: "var(--color-base)",
                  color: "var(--color-text)",
                  borderColor: "var(--color-border)",
                }}
              />
            </fieldset>

            {/* Skills */}
            <fieldset className="flex flex-col hover:scale-[1.02] transition-transform duration-200">
              <legend
                className="text-sm mb-1"
                style={{ color: "var(--color-muted)" }}
              >
                Skills
              </legend>
              <div className="flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  className="input flex-1"
                  placeholder="Type and press Enter"
                  style={{
                    backgroundColor: "var(--color-base)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-border)",
                  }}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "#fff",
                  }}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-full"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "#fff",
                    }}
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSkill(s)}
                      className="!rounded-full !p-1"
                      style={{ color: "var(--color-error)" }}
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            </fieldset>

            {errorMessage && (
              <p
                className="text-center"
                style={{ color: "var(--color-error)" }}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 rounded-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
                opacity: loading ? 0.5 : 1,
              }}
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex justify-center md:block">
        <UserCard
          user={{
            firstName,
            lastName,
            age,
            skills,
            about,
            photoUrl,
            gender,
            isPremium,
          }}
          preview={true}
        />
      </div>
    </div>
  );
};

export default EditProfile;

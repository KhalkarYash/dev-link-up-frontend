import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetPassword = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (confirmPassword !== password) {
        setErrorMessage("Passwords do not match!")
        return;
      }
      const res = await axios.patch(
        BASE_URL + "/profile/password",
        { password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      toast.success("Password reset successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      toast.error("Failed to update password. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Update Password</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">New Password</legend>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={"password"}
                className="input"
                placeholder="Enter new password"
              />
            </fieldset>
          </div>

          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Confirm New Password</legend>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={"password"}
                className="input"
                placeholder="Confirm your password"
              />
            </fieldset>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              onClick={handleResetPassword}
              className="btn btn-primary"
              disabled={!password}
            >
              {loading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>

          <p
            onClick={() => navigate("/")}
            className="text-center cursor-pointer opacity-50 hover:opacity-70"
          >
            Back to Profile
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

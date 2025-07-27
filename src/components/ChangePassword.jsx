import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleResetPassword = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      if (confirmPassword !== password) {
        setErrorMessage("Passwords do not match!");
        return;
      }

      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
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
        theme: "dark",
      });
      navigate("/feed");
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      toast.error("Failed to update password. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-[var(--color-neutral)] text-[var(--color-text)]">
      <div className="bg-[var(--color-base)] border border-[var(--color-border)] w-full max-w-md rounded-2xl shadow-2xl p-6 backdrop-blur-md transition duration-300">
        <h2 className="text-2xl font-bold text-center mb-6">Update Password</h2>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--color-base)] text-[var(--color-text)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
              placeholder="Enter new password"
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-[var(--color-muted)] hover:text-[var(--color-text)] transition !bg-transparent"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--color-base)] text-[var(--color-text)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
              placeholder="Confirm your password"
              minLength={8}
            />
          </div>

          {errorMessage && (
            <p className="text-[var(--color-error)] text-sm text-center transition duration-200">
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleResetPassword}
            disabled={!password || loading}
            className="w-full bg-[var(--color-primary)] text-white py-2 px-4 rounded-lg hover:opacity-90 disabled:opacity-50 transition duration-200"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md" />
            ) : (
              "Reset Password"
            )}
          </button>

          <button
            onClick={() => navigate("/")}
            className="!bg-transparent !cursor-pointer block mx-auto text-sm text-[var(--color-muted)] hover:text-[var(--color-text)] transition duration-200"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

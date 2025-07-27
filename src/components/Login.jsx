import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      toast.success(`Welcome, ${res.data.data.firstName}! 🎉`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/feed");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      toast.error("Login failed. Please check your credentials. ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      toast.success(`${firstName} registered! Start connecting 🎉`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      toast.error("Registration failed. Please try again. ❌", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral)] text-[var(--color-text)] px-4 py-12">
      <div className="w-full max-w-md bg-[var(--color-base)] rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 space-y-5 border border-[var(--color-border)]">
        <h2 className="text-2xl font-bold text-center text-[var(--color-primary)]">
          {isLoginForm ? "Login to DevLinkUp" : "Create your account"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLoginForm ? handleLogin() : handleSignup();
          }}
          className="space-y-4"
        >
          {!isLoginForm && (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                min={1}
                className="input input-bordered w-full"
                required
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full pr-10"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute !bg-transparent cursor-pointer inset-y-0 right-2 flex items-center text-gray-400 hover:text-[var(--color-primary)]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full tracking-wide transition-transform hover:scale-[1.01] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          <p
            onClick={() => {
              setIsLoginForm((prev) => !prev);
              setErrorMessage("");
            }}
            className="text-sm text-center text-[var(--color-primary)] hover:underline cursor-pointer mt-2"
          >
            {isLoginForm
              ? "New user? Register here."
              : "Already registered? Login here."}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

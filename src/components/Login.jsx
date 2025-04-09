import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const initiateLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleLogin();
    }, 1000);
  };

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setLoading(false);
      navigate("/");
      toast.success(`Welcome, ${res.data.data.firstName}! 🎉`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || "Something went wrong!");
      console.error(err);
      toast.error("Login failed. Please check your credentials. ❌", {
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

  const initiateSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleSignup();
    }, 1000);
  };

  const handleSignup = async () => {
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
      toast.success(`${firstName} registered! Please login to continue. 🎉`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      toast.error("Registration failed. Please try again. ❌", {
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
    <div className="flex justify-center items-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginForm && (
              <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="First Name"
                />
              </fieldset>
            )}
            {!isLoginForm && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Last Name"
                />
              </fieldset>
            )}
            {!isLoginForm && (
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  className="input"
                  placeholder="Age"
                />
              </fieldset>
            )}
            {!isLoginForm && (
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
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
                type="email"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input"
                placeholder="Type here"
              />
            </fieldset>
          </div>
          <p
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setErrorMessage("");
            }}
            className="text-center cursor-pointer"
          >
            {isLoginForm
              ? "New User? Register here."
              : "Already registered? Login here."}
          </p>
          {errorMessage.length > 0 && (
            <p className="text-red-600 text-center">{errorMessage}</p>
          )}
          <div className="card-actions justify-center mt-4">
            <button
              onClick={isLoginForm ? initiateLogin : initiateSignUp}
              className="btn btn-primary"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : isLoginForm ? (
                "Login"
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

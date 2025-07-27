import { useCallback, useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (location.pathname !== "/login") {
      fetchUser();
    }
  }, [location.pathname, fetchUser]);

  return (
    <div className="h-fit">
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../utils/constants";
import { removeAllConnections } from "../utils/connectionSlice";
import { removeAllFeed } from "../utils/feedSlice";
import { removeAllRequests } from "../utils/requestSlice";
import { Moon, Sun } from "lucide-react";

export const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("light");

  const logout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeAllConnections());
      dispatch(removeAllFeed());
      dispatch(removeAllRequests());
      toast.success("Logged out successfully.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const effectiveTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(effectiveTheme);
    document.documentElement.setAttribute("data-theme", effectiveTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <nav className="navbar sticky top-0 z-[100] px-4 py-2 shadow-md border-b border-[var(--color-border)] bg-[var(--color-neutral)/30] backdrop-blur-md backdrop-saturate-150 w-[90%] mx-auto rounded-full">
      <div className="flex-1">
        <Link
          to="/feed"
          className="flex items-center gap-2 text-xl font-bold !text-[var(--color-text)] hover:opacity-90 transition"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover select-none"
            onContextMenu={(e) => e.preventDefault()}
          />
          DevLinkUp
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <span className="hidden sm:inline text-[var(--color-muted)] font-bold">
            Hi, {user.data.firstName}
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="btn btn-ghost !bg-transparent !text-[var(--color-muted)] hover:!border-none !p-1 !rounded-full btn-circle hover:bg-[var(--color-primary)] hover:text-white transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-[var(--color-primary)] ring-offset-2"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  src={
                    user.data.photoUrl ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[100] p-2 bg-[var(--color-base)] border border-[var(--color-border)] rounded-lg shadow-md w-52 text-[var(--color-text)] relative"
            >
              <li>
                <Link to="/feed" className="hover:text-[var(--color-primary)]">
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-[var(--color-primary)]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/premium"
                  className="hover:text-[var(--color-primary)]"
                >
                  Premium
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:text-[var(--color-primary)]"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:text-[var(--color-primary)]"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/change-password"
                  className="hover:text-[var(--color-primary)]"
                >
                  Update Password
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="!bg-transparent font-semibold !text-red-500 hover:bg-gradient-to-br hover:from-red-600 hover:via-red-500 hover:to-red-400 hover:text-transparent hover:bg-clip-text transition-colors duration-300 ease-in-out px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

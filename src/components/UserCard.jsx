import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { motion, AnimatePresence } from "framer-motion";

const UserCard = ({ user, preview = false, onAction = () => {} }) => {
  const dispatch = useDispatch();
  const {
    photoUrl,
    firstName,
    lastName,
    age,
    about,
    skills,
    gender,
    isPremium,
  } = user;

  const [imgLoaded, setImgLoaded] = useState(false);
  const [loadingAction, setLoadingAction] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  const handleRequest = async (status) => {
    if (preview) return;
    setLoadingAction(status);
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );

      setIsVisible(false);

      setTimeout(() => {
        dispatch(removeFeed());
        onAction(status);
      }, 800);
    } catch (err) {
      console.error(err);
      setLoadingAction(null);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="w-80 sm:w-96 rounded-xl overflow-hidden shadow-md"
          style={{
            backgroundColor: "var(--color-base)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            x: loadingAction === "interested" ? 300 : -300,
            rotate: loadingAction === "interested" ? 20 : -20,
            transition: { duration: 0.8 },
          }}
        >
          <div
            className="relative w-full h-72"
            style={{ backgroundColor: "var(--color-border)" }}
          >
            {!imgLoaded && (
              <div
                className="absolute inset-0 flex items-center justify-center animate-pulse"
                style={{ backgroundColor: "var(--color-neutral)" }}
              >
                <span
                  className="loading loading-spinner"
                  style={{ color: "var(--color-muted)" }}
                />
              </div>
            )}
            <img
              src={photoUrl}
              alt={`${firstName}'s Profile`}
              className={`object-cover w-full h-full transition-opacity select-none duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImgLoaded(true)}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center">
                {firstName} {lastName}
                {isPremium && (
                  <img
                    className="h-[1em] ml-2 inline-block"
                    src="https://png.pngtree.com/png-vector/20230408/ourmid/pngtree-instagram-bule-tick-insta-blue-star-vector-png-image_6695210.png"
                    alt="Verified"
                    onContextMenu={(e) => e.preventDefault()}
                  />
                )}
              </h2>
              <span className="text-sm" style={{ color: "var(--color-muted)" }}>
                {age},{" "}
                {gender === "male" ? "M" : gender === "female" ? "W" : "Other"}
              </span>
            </div>

            <p
              className="mt-2 text-sm text-center"
              style={{ color: "var(--color-muted)" }}
            >
              {about}
            </p>

            <p
              className="mt-2 text-xs text-center"
              style={{ color: "var(--color-muted)" }}
            >
              Skills: {skills.join(", ")}
            </p>

            <div className="flex justify-evenly mt-4 gap-2">
              <button
                className="w-28 py-2 px-4 rounded border font-semibold cursor-pointer"
                onClick={() => handleRequest("ignored")}
                disabled={loadingAction !== null}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--color-error)",
                  color: "var(--color-error)",
                  opacity: loadingAction ? 0.7 : 1,
                }}
              >
                {loadingAction === "ignored" ? (
                  <span
                    className="loading loading-spinner"
                    style={{ color: "var(--color-error)" }}
                  />
                ) : (
                  "Ignore ❌"
                )}
              </button>

              <button
                className="w-28 py-2 px-4 rounded border font-semibold cursor-pointer"
                onClick={() => handleRequest("interested")}
                disabled={loadingAction !== null}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "var(--color-success)",
                  color: "var(--color-success)",
                  opacity: loadingAction ? 0.7 : 1,
                }}
              >
                {loadingAction === "interested" ? (
                  <span
                    className="loading loading-spinner"
                    style={{ color: "var(--color-success)" }}
                  />
                ) : (
                  "Accept ✅"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserCard;

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { motion } from "framer-motion";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [isPremiumUser, setIsPremiumUser] = useState(
    user?.data?.isPremium || false
  );
  const [isLoading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const verifyPremiumUser = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsPremiumUser(true);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUser();
    verifyPremiumUser();
  }, [verifyPremiumUser, fetchUser]);

  const handleBuyClick = async (type) => {
    setIsProcessing(true);
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, key, currency, notes, orderId } = order.data;

      const options = {
        key,
        amount,
        currency,
        name: "DevLinkUp",
        description: "Connect to other devs",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: () => {
          verifyPremiumUser();
          setIsProcessing(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", () => setIsProcessing(false));
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-10 min-h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (isPremiumUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center pt-20 text-2xl min-h-screen text-[var(--color-text)]"
      >
        You are already a Premium User!
      </motion.div>
    );
  }

  return (
    <div className="pb-20 pt-10 px-4 sm:px-10 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card bg-base-300 shadow-md p-6 rounded-xl text-center"
        >
          <h1 className="font-bold text-3xl mb-4">Silver Membership</h1>
          <ul className="mb-4 space-y-1 text-sm text-left">
            <li>• Chat with other people</li>
            <li>• 100 connection requests/day</li>
            <li>• Blue Tick</li>
            <li>• Valid for 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Get Silver"
            )}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card bg-base-300 shadow-md p-6 rounded-xl text-center"
        >
          <h1 className="font-bold text-3xl mb-4">Gold Membership</h1>
          <ul className="mb-4 space-y-1 text-sm text-left">
            <li>• Chat with other people</li>
            <li>• Unlimited connection requests/day</li>
            <li>• Blue Tick</li>
            <li>• Valid for 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary w-full"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Get Gold"
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Premium;

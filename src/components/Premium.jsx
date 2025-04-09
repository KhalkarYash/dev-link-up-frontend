import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [isPremiumUser, setIsPremiumUser] = useState(
    user.data.isPremium || false
  );

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsPremiumUser(true);
    }
  };

  const handleByClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    // Open Razorpay Dialog Box
    const { amount, key, currency, notes, orderId } = order.data;

    const options = {
      key,
      amount,
      currency,
      name: "DevLinkUp",
      description: "Connect to other devs",
      order_id: orderId,
      // callback_url: 'http://localhost:3000/payment-success',
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.email,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isPremiumUser ? (
    <div className="text-center mt-10 text-2xl">
      You are already a Premium User!
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-4">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>100 connection requests per day</li>
            <li>Blue Tick</li>
            <li>3 months</li>
          </ul>
          <button
            onClick={() => handleByClick("silver")}
            className="btn btn-secondary"
          >
            Get Silver
          </button>
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>Unlimited connection requests per day</li>
            <li>Blue Tick</li>
            <li>6 Months</li>
          </ul>
          <button
            onClick={() => handleByClick("gold")}
            className="btn btn-primary"
          >
            Get Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;

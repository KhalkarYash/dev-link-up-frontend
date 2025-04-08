import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const handleByClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    // Open Razorpay Dialog Box
    console.log(order.data);
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
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
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

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
dayjs.extend(relativeTime);
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?.data?._id;
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    // Join Chat as soon as the page loads, socket connection is made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
    });

    socket.on("errorMessage", ({ message }) => {
      console.error("Socket error:", message);
      navigate("/connections");
      toast.error("You can only chat with your connections.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, text, userId, timeStamp }) => {
        setMessages((messages) => [
          ...messages,
          { firstName, lastName, text, senderId: userId, timeStamp },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    fetchChat();
  }, [targetUserId]);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchChat = async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const msgData = res?.data?.data;

      const chatMessages = msgData?.messages.map((msg) => {
        const { senderId, text } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          senderId: senderId?._id,
          timeStamp: msg?.createdAt,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    socketRef.current.emit("sendMessage", {
      firstName: user?.data?.firstName,
      lastName: user?.data?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-[90%] md:w-1/2 mx-auto border border-gray-600 my-10 h-[70vh] flex flex-col rounded-lg">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div ref={chatBoxRef} className="flex-1 overflow-y-scroll p-2">
        {loading ? (
          <div className="flex flex-row justify-center my-20">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : (
          messages.map((msg, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  "chat " +
                  (userId === msg?.senderId ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header mb-1">
                  {userId === msg?.senderId
                    ? "You"
                    : `${msg?.firstName} ${msg?.lastName}`}
                  {/* <time className="text-xs opacity-50">
                    {dayjs(msg?.timeStamp).fromNow()}
                  </time> */}
                </div>
                <div
                  className={
                    "chat-bubble " +
                    (userId === msg?.senderId
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700")
                  }
                >
                  {msg.text}
                </div>
                {/* <div className="chat-footer opacity-50">Seen</div> */}
                <div className="chat-footer opacity-50">
                  {dayjs(msg?.timeStamp).fromNow()}
                </div>
              </motion.div>
            );
          })
        )}
        {isTyping && (
          <div className="text-xs text-gray-400 mb-2">Typing...</div>
        )}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage();
            }
          }}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 text-white rounded p-2"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="btn btn-secondary"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

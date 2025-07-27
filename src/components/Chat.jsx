import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = useSelector((store) => store.user);
  const userId = user?.data?._id;
  const socketRef = useRef(null);
  const typingTimeout = useRef(null);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user?.data?.firstName,
      userId,
      targetUserId,
    });

    socket.on("errorMessage", ({ message }) => {
      console.error("Socket error:", message);
      navigate("/connections");
      toast.error("You can only chat with your connections.");
    });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, text, userId, timeStamp }) => {
        setMessages((prev) => [
          ...prev,
          { firstName, lastName, text, senderId: userId, timeStamp },
        ]);
      }
    );

    socket.on("userTyping", ({ userId: typingUserId }) => {
      if (typingUserId === targetUserId) {
        setIsTyping(true);
      }
    });

    socket.on("userStoppedTyping", ({ userId: stoppedUserId }) => {
      if (stoppedUserId === targetUserId) {
        setIsTyping(false);
      }
    });

    socket.on("messageSeenByReceiver", ({ userId: seenBy }) => {
      if (seenBy === targetUserId) {
        setMessages((prev) => [...prev]); // re-render for seen marker
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, navigate, user?.data?.firstName]);

  const fetchChat = useCallback(async () => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = res?.data?.data?.messages.map((msg) => ({
        firstName: msg.senderId?.firstName,
        lastName: msg.senderId?.lastName,
        text: msg.text,
        senderId: msg.senderId?._id,
        timeStamp: msg.createdAt,
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [targetUserId]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
    if (socketRef.current) {
      socketRef.current.emit("messageSeen", { userId, targetUserId });
    }
  }, [messages, targetUserId, userId]);

  const handleTyping = () => {
    socketRef.current.emit("typing", { userId, targetUserId });
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit("stopTyping", { userId, targetUserId });
    }, 800);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user?.data?.firstName,
      lastName: user?.data?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    socketRef.current.emit("stopTyping", { userId, targetUserId });
    setNewMessage("");
  };

  return (
    <div className="w-[90%] md:w-2/3 lg:w-1/2 mx-auto my-10 h-[70vh] flex flex-col rounded-lg border border-[var(--color-border)]">
      <h1 className="p-5 border-b border-[var(--color-border)] text-lg font-semibold text-[var(--color-primary)]">
        Chat
      </h1>

      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-scroll px-4 py-2 bg-[var(--color-base)]"
      >
        {loading ? (
          <div className="flex justify-center items-center my-20">
            <span className="loading loading-spinner loading-lg text-[var(--color-secondary)]" />
          </div>
        ) : (
          messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`chat ${
                userId === msg?.senderId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header mb-1 text-xs text-gray-500">
                {userId === msg?.senderId
                  ? "You"
                  : `${msg?.firstName} ${msg?.lastName}`}
              </div>
              <div
                className={`chat-bubble ${
                  userId === msg?.senderId
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-accent)] text-white"
                }`}
              >
                {msg.text}
              </div>
              <div className="chat-footer text-xs opacity-50 mt-1">
                {dayjs(msg?.timeStamp).fromNow()}
              </div>
            </motion.div>
          ))
        )}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-gray-400 mt-2"
            >
              Typing...
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-[var(--color-border)] flex items-center gap-2 bg-[var(--color-neutral)]">
        <motion.input
          value={newMessage}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          initial={{ scale: 1 }}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-1 border border-[var(--color-border)] bg-transparent text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="btn btn-secondary transition-all duration-200 hover:scale-105 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

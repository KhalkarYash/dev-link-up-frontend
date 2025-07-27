import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const LandingPage = () => {
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoVisible(true);
    }, [500]);
    return () => {
      clearTimeout(timer);
    };
  }, [logoVisible]);

  useEffect(() => {
    const ping = new Image();
    ping.src = BASE_URL + "?_t=" + Date.now();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "var(--color-neutral)",
          color: "var(--color-text)",
        }}
      >
        {/* Logo + Name Section */}
        <motion.div
          className={`${
            logoVisible ? "flex" : "invisible"
          } flex-col justify-center items-center pt-10 gap-4 p-6`}
          initial={{ opacity: 0, y: 50 }}
          animate={logoVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="rounded-full overflow-hidden shadow-[4px_0_12px_var(--color-secondary)]"
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            <img src="/logo.jpg" alt="DevLinkUp Logo" className="w-80 h-80" />
          </motion.div>
          <h2 className="text-4xl font-semibold bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
            DevLinkUp
          </h2>
        </motion.div>

        {/* Hero Section */}
        <section className="text-center px-6 pt-4 pb-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-[var(--color-text)] to-[var(--color-text)/30] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find Like-Minded Collaborators
          </motion.h1>
          <motion.p
            className="text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--color-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Swipe. Connect. Collaborate. Whether you&apos;re building a startup
            or working on a side project — meet people who match your passion.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/login">
              <button
                className="px-8 py-3 text-lg rounded-full font-semibold cursor-pointer"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-text)",
                }}
              >
                Get Started
              </button>
            </Link>
            <Link to="/feed">
              <button
                className="px-8 py-3 text-lg rounded-full font-semibold border cursor-pointer"
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-primary)",
                  borderColor: "var(--color-primary)",
                }}
              >
                Explore
              </button>
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
          {[
            {
              title: "Swipe to Connect",
              desc: "Swipe right on people who inspire you. Discover collaborators who share your vision.",
              icon: "🤝",
            },
            {
              title: "Real-Time Chat",
              desc: "Instantly message your connections using our seamless, real-time chat interface.",
              icon: "💬",
            },
            {
              title: "Skill Matching",
              desc: "Match based on skills, interests, and project goals. Make every connection count.",
              icon: "🚀",
            },
          ].map((f, idx) => (
            <motion.div
              key={idx}
              className="p-6 rounded-xl shadow-xl"
              style={{
                backgroundColor: "var(--color-base)",
                border: "1px solid var(--color-border)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {f.title}
              </h3>
              <p style={{ color: "var(--color-muted)" }}>{f.desc}</p>
            </motion.div>
          ))}
        </section>
        {/* CTA Section */}
        <motion.section
          className="text-center py-20 px-6"
          style={{ backgroundColor: "var(--color-base)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "var(--color-text)" }}
          >
            Ready to find your dream team?
          </h2>
          <p className="mb-8" style={{ color: "var(--color-muted)" }}>
            Join a growing community of developers, designers, and innovators
            collaborating on amazing ideas.
          </p>
          <Link to="/login">
            <button
              className="px-8 py-3 text-lg rounded-full font-semibold cursor-pointer"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "#fff",
              }}
            >
              Sign In Now
            </button>
          </Link>
        </motion.section>
      </div>

      <Footer />
    </>
  );
};

export default LandingPage;

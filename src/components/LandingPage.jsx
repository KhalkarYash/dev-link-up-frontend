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

        {/* Mockup Showcase Section */}
        <motion.section
          className="py-16 px-6 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              See DevLinkUp in Action
            </motion.h2>
            <motion.p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--color-muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Browse through our app interface and watch our interactive demo to
              see how easy collaboration can be.
            </motion.p>
          </div>

          {/* Screenshot Section - Left Aligned */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3">
                <div
                  className="rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: "var(--color-base)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <img
                    src="/demo.png"
                    alt="DevLinkUp App Screenshots"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      // Fallback content if image doesn't exist
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />

                  {/* Image Fallback content */}
                  <div
                    className="w-full aspect-video flex flex-col items-center justify-center text-center p-8"
                    style={{
                      display: "none",
                      backgroundColor: "var(--color-neutral)",
                    }}
                  >
                    <div className="text-6xl mb-4">📱</div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      App Screenshots
                    </h3>
                    <p style={{ color: "var(--color-muted)" }}>
                      Add your app screenshots to /public/mockup-screenshot.jpg
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 text-left">
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Intuitive Interface
                </motion.h3>
                <motion.p
                  className="mb-6"
                  style={{ color: "var(--color-muted)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Experience our clean, modern interface designed for seamless
                  collaboration. Swipe through profiles, connect with
                  like-minded developers, and start building together.
                </motion.p>
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    { icon: "💬", text: "Real-time messaging" },
                    { icon: "🚀", text: "Project collaboration tools" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span style={{ color: "var(--color-text)" }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Video Section - Center-Right Aligned */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
              <div className="lg:w-2/3">
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backgroundColor: "var(--color-base)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <video
                    className="w-full h-auto object-cover"
                    controls
                    autoPlay
                    muted
                    playsInline
                    poster="/video-thumbnail.jpg"
                    onError={(e) => {
                      // Fallback content if video doesn't exist
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  >
                    <source src="/demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Fallback content */}
                  <div
                    className="w-full aspect-video flex flex-col items-center justify-center text-center p-8"
                    style={{
                      display: "none",
                      backgroundColor: "var(--color-neutral)",
                    }}
                  >
                    <div className="text-6xl mb-4">🎥</div>
                    <h3
                      className="text-2xl font-bold mb-2"
                      style={{ color: "var(--color-text)" }}
                    >
                      Demo Video
                    </h3>
                    <p style={{ color: "var(--color-muted)" }}>
                      Add your demo video to /public/demo-video.mp4
                    </p>
                  </div>

                  {/* Video overlay info */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div
                      className="flex justify-between items-center backdrop-blur-sm rounded-lg p-3"
                      style={{ backgroundColor: "var(--color-base)/80" }}
                    >
                      <div
                        className="flex gap-4 text-sm"
                        style={{ color: "var(--color-text)" }}
                      >
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "var(--color-success)" }}
                          ></span>
                          Live Demo
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "var(--color-accent)" }}
                          ></span>
                          Interactive Features
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 text-left">
                <motion.h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--color-text)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  See It in Action
                </motion.h3>
                <motion.p
                  className="mb-6"
                  style={{ color: "var(--color-muted)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Watch our comprehensive demo to see how DevLinkUp transforms
                  the way developers connect and collaborate on projects.
                </motion.p>
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {[
                    { icon: "⚡", text: "Lightning-fast connections" },
                    { icon: "🔒", text: "Secure & private" },
                    { icon: "🌟", text: "Premium features available" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span style={{ color: "var(--color-text)" }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6" style={{ color: "var(--color-muted)" }}>
              Ready to experience the future of developer collaboration?
            </p>
            <Link to="/login">
              <motion.button
                className="px-8 py-3 text-lg rounded-full font-semibold transition-all duration-200"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-base)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
            </Link>
          </motion.div>
        </motion.section>

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

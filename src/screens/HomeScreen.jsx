import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { motion } from "framer-motion";

const HomeScreen = () => {
  const { isAuthenticated } = useAuth();

  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 0.8 },
    },
  };

  return (
    <main className="font-sans">
      <AnalyticsTracker screenName={"HomeScreen"} />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="container w-11/12 mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 animate-fade-in">
            Master Your <span className="text-pink-500">Interview</span> Skills
            with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            Practice{" "}
            <span className="text-pink-500 font-semibold">interviews</span> with
            an AI that provides real-time feedback and helps you improve faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to={isAuthenticated ? "/interviews/schedule" : "/register"}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-10 py-4 text-lg transition-all duration-300 shadow-lg hover:scale-105"
            >
              {isAuthenticated ? "Schedule Interview" : "Get Started"}
            </Link>
            <a
              href="#features"
              className="bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg px-10 py-4 text-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section id="features" className="py-10 bg-white">
        <div className="container w-11/12 mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to ace your next{" "}
              <span className="text-pink-500 font-semibold">interview</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "AI-Powered Practice",
                description:
                  "Practice with an AI interviewer that adapts to your skills and provides realistic scenarios.",
                icon: (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </motion.svg>
                ),
                iconBg: "bg-blue-100",
              },
              {
                title: "Resume Analysis",
                description:
                  "Upload your resume to receive tailored questions based on your experience and skills.",
                icon: (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ scale: 1.3, rotate: -10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </motion.svg>
                ),
                iconBg: "bg-blue-100",
              },
              {
                title: "Coding Challenges",
                description:
                  "Solve coding problems in multiple languages and improve your algorithmic skills.",
                icon: (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ scale: 1.4, rotate: -10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                    />
                  </motion.svg>
                ),
                iconBg: "bg-gradient-to-r from-green-200 to-green-400", // lighter green
              },
              {
                title: "Quizzes",
                description:
                  "Take timed quizzes to test your knowledge and track your improvement over time.",
                icon: (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ scale: 1.4, rotate: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                ),
                iconBg: "bg-gradient-to-r from-yellow-200 to-yellow-400", // lighter yellow
              },
              {
                title: "Detailed Feedback",
                description:
                  "Get comprehensive feedback on your performance with scores and improvement suggestions.",
                icon: (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </motion.svg>
                ),
                iconBg: "bg-blue-100",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition-shadow duration-300 text-center mx-auto"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
              >
                <div
                  className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 ${feature.iconBg}`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container w-11/12 mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">
            Ready to ace your next{" "}
            <span className="text-pink-500">interview</span>?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create an account and start practicing today
          </p>
          <Link
            to={isAuthenticated ? "/interviews/schedule" : "/register"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-12 py-4 text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            {isAuthenticated
              ? "Schedule Your First Interview"
              : "Sign Up for Free"}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;

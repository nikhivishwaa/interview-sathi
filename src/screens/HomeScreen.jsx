import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AnalyticsTracker from "../components/AnalyticsTracker";

const HomeScreen = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main>
      <AnalyticsTracker screenName={"HomeScreen"}/>
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container w-11/12 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Master Your Interview Skills with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice interviews with an AI interviewer that provides real-time
              feedback and helps you improve
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={isAuthenticated ? "/interviews/schedule" : "/register"}
                className="sathi-btn-primary px-8 py-3 text-lg"
              >
                {isAuthenticated ? "Schedule Interview" : "Get Started"}
              </Link>
              <a
                href="#features"
                className="sathi-btn-secondary px-8 py-3 text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container w-11/12 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to ace your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="sathi-card text-center">
              <div className="h-16 w-16 bg-sathi-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sathi-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Practice
              </h3>
              <p className="text-gray-600">
                Practice with an AI interviewer that adapts to your skills and
                provides realistic interview scenarios
              </p>
            </div>

            <div className="sathi-card text-center">
              <div className="h-16 w-16 bg-sathi-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sathi-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Resume Analysis
              </h3>
              <p className="text-gray-600">
                Upload your resume to receive tailored questions based on your
                experience and skills
              </p>
            </div>

            <div className="sathi-card text-center">
              <div className="h-16 w-16 bg-sathi-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sathi-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Detailed Feedback
              </h3>
              <p className="text-gray-600">
                Get comprehensive feedback on your performance with scores and
                improvement suggestions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container w-11/12 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to ace your next interview?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create an account and start practicing today
            </p>
            <Link
              to={isAuthenticated ? "/interviews/schedule" : "/register"}
              className="sathi-btn-primary px-8 py-3 text-lg"
            >
              {isAuthenticated ? "Schedule Your First Interview" : "Sign Up for Free"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeScreen;

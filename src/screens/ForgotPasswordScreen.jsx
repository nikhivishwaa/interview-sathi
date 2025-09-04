import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { sendAnalytics } from "../utils/firebase";
import AnalyticsTracker from "../components/AnalyticsTracker";

const ForgotPasswordScreen = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { forgotPassword, loading, error } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
  };
  return (
    <div className="dot-bg min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AnalyticsTracker screenName="ForgotPasswordScreen"/>
      <div className="mx-auto text-center mb-10">
        <Link to="/">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto h-12 w-auto rounded-lg border-1 border-[#ecedee]"
          />
        </Link>
        <Link to="/">
          <h1 className="text-3xl font-bold text-sathi-primary">
            Interview Sathi
          </h1>
        </Link>
        <p className="mt-2 text-gray-600">Reset your password</p>
      </div>

      <div className="mx-auto w-full max-w-md">
        {submitted ? (
          <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                Check your email
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a password reset link to {email}. Please check your
                inbox.
              </p>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="sathi-btn-primary w-full justify-center"
              >
                Return to Login
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Forgot your password?
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sathi-input mt-1"
                  placeholder="your-email@example.com"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="sathi-btn-primary w-full"
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Send Reset Link
                </button>
              </div>

              <div className="text-center">
                <Link
                  to="/login"
                  className="font-medium text-sathi-primary hover:underline"
                >
                  Return to login
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { emailValidator } from "../utils/validators";
import { closeEye, openEye, spinner } from "../data/SvgImageData";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { sendAnalytics } from "../utils/firebase";
import logger from "../utils/logger";

const LoginScreen = () => {
  const { isAuthenticated, initiateAuthConfirmation, updateUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = () => {
    if (!email.length) {
      setValidEmail(false);
      setEmailError("Please enter email / mobile no.");
    }
    if (isNaN(parseInt(email))) {
      if (!emailValidator(email)) {
        setValidEmail(false);
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
        setValidEmail(true);
      }
    } else {
      // validate phone number
      if (email.search(/^\d{10}$/) === -1) {
        setValidEmail(false);
        setEmailError("Please enter a valid phone number");
      } else {
        setEmailError("");
        setValidEmail(true);
      }
    }
  };

  const validatePassword = () => {
    if (!password.length) {
      setValidPassword(false);
      setPasswordError("Please enter password");
    } else {
      setPasswordError("");
      setValidPassword(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    logger("checking login form");
    validateEmail();
    validatePassword();
    if (validEmail && validPassword) {
      logger({ email, password });
      setSubmitting(true);
      handleSignIn();
    }
  };
  async function handleSignIn() {
    try {
      const apiUrl = import.meta.env.VITE_BACKEND;
      const response = await axios.post(
        `${apiUrl}/users/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const { access, refresh, user } = response.data.data;
        secureLocalStorage.setItem("token", access);
        secureLocalStorage.setItem("refresh_token", refresh);
        updateUser(user);
        secureLocalStorage.setItem("lastLogin", new Date().getTime());
        initiateAuthConfirmation();
        toast.success(
          `Welcome, ${
            user?.first_name[0]?.toUpperCase() + user?.first_name.slice(1)
          }!`
        );
        sendAnalytics("user_login", {});
        navigate("/dashboard", {
          replace: true,
        });
      }
    } catch (error) {
      logger("Error while signing in: ", error);
      logger(error.response.status);
      if (error.response.status === 404) toast.error("Account not Exist!");
      else if (error.response.status === 400)
        toast.error("Invalid Credentials!");
      else toast.error("Something went wrong. Try again!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="dot-bg min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AnalyticsTracker screenName="LoginScreen"/>
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
        <p className="mt-2 text-gray-600">Practice interviews with AI</p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to="/register"
                className="font-medium text-sathi-primary hover:underline"
              >
                create a new account
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email / Phone
                </label>
                <input
                  readOnly={submitting}
                  type="text"
                  id="email"
                  name="email"
                  className="sathi-input mt-1"
                  placeholder="email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                  onBlur={validateEmail}
                  style={{ borderColor: validEmail ? "#555" : "red" }}
                />
                <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                  {emailError}
                </span>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1"><div className="relative">
                  <input
                    id="password"
                    className="sathi-input pr-10"
                    placeholder="••••••••"
                    readOnly={submitting}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                    style={{ borderColor: validPassword ? "#555" : "red" }}
                    onBlur={validatePassword}
                  />
                  <button
                    type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2 pr-3 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? openEye : closeEye}
                  </button>
                  </div>
                  <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                    {passwordError}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-sathi-primary focus:ring-sathi-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-sathi-primary hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="sathi-btn-primary w-full"
              >
                {submitting ? (
                  spinner
                ) : null}
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

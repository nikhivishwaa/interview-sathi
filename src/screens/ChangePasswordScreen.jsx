import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { closeEye, openEye, spinner } from "../data/SvgImageData";
import { passwordValidator } from "../utils/validators";
import { toast } from "sonner";
import axios from "axios";
import { sendAnalytics } from "../utils/firebase";
import AnalyticsTracker from "../components/AnalyticsTracker";

const ChangePasswordScreen = ({ close }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { apiUrl, getAuthHeader } = useAuth();
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({
    currentPasswordError: "",
    passwordError: "",
    repasswordError: "",
  });


  // check password
  const validatePassword = () => {
    if (!password.length) {
      return "Please enter password";
    } else if (password.length < 8) {
      return "Password must be 8 character long";
    } else if (!passwordValidator(password)) {
      return "Password must contain alphanumeric (a-z, A-Z, 0-9) and @, !, $, %, ^, &, *, (, ), +, -, ?, /";
    } else {
      return "";
    }
  };

  // check confirm password
  const validateRepassword = () => {
    if (!confirmPassword.length) {
      return "Please enter confirm password";
    } else if (confirmPassword !== password) {
      return "Confirm Password should be same as password";
    } else if (confirmPassword === password) {
      return validatePassword();
    } else {
      return "";
    }
  };

  const updatePassword = async (old_password, new_password) => {
    setSubmitting(true);
    setError(undefined);
    try {
      await axios.put(
        `${apiUrl}/users/changepassword/`,
        {
          old_password,
          new_password,
        },
        getAuthHeader()
      );
      sendAnalytics('screen_action',{
        action_name: "password changed",
        screen_name: "ChangePasswordScreen"
      })
      toast.success("Password updated successfully!");
      setTimeout(close, 100);
    } catch (error) {
      console.error("Change password error:", error);
      setError("Failed to update password.");
      toast.error("Failed to update password.");
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const checks = {};
    checks.passwordError = validatePassword();
    checks.repasswordError = validateRepassword();
    checks.currentPasswordError =
      password === currentPassword
        ? "new password can't be same as current password"
        : "";

    setFieldError(checks);
    let errorCount = 0;
    for (const err in checks) {
      errorCount += checks[err].length ? 1 : 0;
    }
    if (!errorCount) {
      updatePassword(currentPassword, password);
    } else {
      toast.warning("Please correct the details");
    }
  };
  return (
    <main className="absolute top-0 z-1000 w-full min-h-screen bg-gray-50">
      <AnalyticsTracker screenName="ChangePasswordScreen"/>
    <div className="dot-bg w-full  min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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
        <p className="mt-2 text-gray-600">Set your new password</p>
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Change your password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password below
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <input
                      readOnly={submitting}
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      required
                      value={currentPassword}
                      style={{
                        borderColor: !fieldError.currentPasswordError.length
                          ? "#555"
                          : "red",
                      }}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="sathi-input pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2 pr-3 text-gray-500"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? openEye : closeEye}
                    </button>
                  </div>
                  <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                    {fieldError?.currentPasswordError}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <input
                      readOnly={submitting}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      style={{
                        borderColor: !fieldError.passwordError.length
                          ? "#555"
                          : "red",
                      }}
                      onChange={(e) => setPassword(e.target.value)}
                      className="sathi-input pr-10"
                      placeholder="••••••••"
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
                    {fieldError?.passwordError}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <input
                      readOnly={submitting}
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      style={{
                        borderColor: !fieldError.repasswordError.length
                          ? "#555"
                          : "red",
                      }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="sathi-input mt-1"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2 pr-3 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? openEye : closeEye}
                    </button>
                  </div>

                  <span className="block text-[12px] font-medium py-1 px-[10px] text-[red]">
                    {fieldError?.repasswordError}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-5">
              <button onClick={close} className="sathi-btn-secondary py-2 px-4">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="sathi-btn-primary"
              >
                {submitting ? spinner : null}
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </main>
  );
};

export default ChangePasswordScreen;

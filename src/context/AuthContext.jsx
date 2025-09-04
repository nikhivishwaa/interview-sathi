import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { analytics, sendAnalytics, setUserId } from "../utils/firebase";

const apiUrl = import.meta.env.VITE_BACKEND || "http://localhost:8000";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const navigate = useNavigate();

  const initiateAuthConfirmation = async () => {
    setLoading(true);
    try {
      const auth = secureLocalStorage.getItem("token");
      const userData = JSON.parse(secureLocalStorage.getItem("user"));
      const lastLogin = parseInt(secureLocalStorage.getItem("lastLogin"));

      if (auth && !isNaN(lastLogin)) {
        const isExpired =
          new Date().getTime() - lastLogin > 1000 * 3600 * 24 * 4; // token life of 4 days
        if (isExpired) {
          secureLocalStorage.clear();
          setUser(null);
          if (analytics) {
            setUserId(analytics, "guest");
          }

          setToken("");
          setLoading(false);
          return false;
        }

        setUser(userData);
        if (analytics && userData?.id) {
          setUserId(analytics, userData.id);
        }
        setToken(auth);
        setLoading(false);
        return true;
      }

      setUser(null);
      setToken("");
      setLoading(false);
      return false;
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
      setToken("");
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    initiateAuthConfirmation();
  }, []);

  const getAuthHeader = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const logout = () => {
    secureLocalStorage.clear();

    sendAnalytics("user_logout", {});
    if (analytics) {
      setUserId(analytics, "guest");
    }

    setUser(null);
    setToken("");
    navigate("/", { replace: true });
    setTimeout(() => toast.success("Logged out successfully!"), 150);
  };

  const updateUser = (userData) => {
    setUser(userData);
    secureLocalStorage.setItem("user", JSON.stringify(userData));
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError(undefined);
    try {
      await axios.post(`${apiUrl}/users/password/reset/`, { email });
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to send reset email.");
      toast.error("Failed to send reset email.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    apiUrl,
    user,
    loading,
    error,
    token,
    isAuthenticated: !!user,
    updateUser,
    initiateAuthConfirmation,
    getAuthHeader,
    logout,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  CodeIcon,
  LayoutDashboardIcon,
  LogOut,
  MessageCircleReply,
  UserRound,
} from "lucide-react";

const Header = () => {
  const { initiateAuthConfirmation, user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Framer Motion wrapper for Link
  const MotionLink = motion(Link);
  const MotionButton = motion.button;

  // Navigation links for authenticated users
  const links = isAuthenticated
    ? [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: <LayoutDashboardIcon />,
        },
        // { name: "Jobs", path: "/jobs" },
        { name: "Practice", path: "/practice", icon: <CodeIcon /> },
        { name: "Feedbacks", path: "/feedback", icon: <MessageCircleReply /> },
        // { name: "Quizzes", path: "/quizzes" },  // <-- Added Quiz link
        { name: "Profile", path: "/profile", icon: <UserRound /> },
      ]
    : [];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto w-11/12 px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <span className="flex items-center gap-3">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto rounded-lg border border-gray-200"
            />
          </Link>
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            <h1 className="text-2xl font-bold text-sathi-primary hover:text-pink-500 transition-colors duration-300">
              Interview Sathi
            </h1>
          </Link>
        </span>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated &&
            links.map((link, idx) => (
              <MotionLink
                key={idx}
                to={link.path}
                className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:text-sathi-primary transition-colors duration-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex gap-2">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </div>
              </MotionLink>
            ))}

          {isAuthenticated && (
            <MotionButton
              onClick={logout}
              className="px-4 py-2 rounded-lg text-gray-700 font-medium hover:text-red-500 transition-colors duration-100"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex gap-2">
                <span>
                  <LogOut />
                </span>
                <span>Logout</span>
              </div>
            </MotionButton>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="sathi-btn-secondary flex gap-3">
                <img src="/icons/google.png" alt="google" className="w-5 h-5" />
                <span>Login</span>
              </Link>
              <Link to="/register" className="sathi-btn-primary">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-700 hover:text-sathi-primary transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

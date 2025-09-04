import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import secureLocalStorage from "react-secure-storage";
import { toast } from "sonner";

const Header = () => {
  const { initiateAuthConfirmation, user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto w-11/12 px-4 py-4">
        <div className="flex justify-between items-center">
          <span className="flex justify-center items-center gap-3">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              <img
                src="/logo.png"
                alt="Logo"
                className="mx-auto h-8 w-auto rounded-lg border-1 border-[#ecedee]"
              />
            </Link>
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              <h1 className="text-2xl font-bold text-sathi-primary">
                Interview Sathi
              </h1>
            </Link>
          </span>
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-sathi-primary transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/feedback"
                  className="text-gray-700 hover:text-sathi-primary transition-colors"
                >
                  Feedbacks
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-sathi-primary transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-sathi-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-sathi-primary transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="sathi-btn-primary">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-sathi-primary">
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
      </div>
    </header>
  );
};

export default Header;

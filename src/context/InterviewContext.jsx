import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "./AuthContext";

const InterviewContext = createContext(undefined);

export const InterviewProvider = ({ children }) => {
  const [interviews, setInterviews] = useState([]);
  const [resumes, setResumes] = useState([]);
  const { isAuthenticated, token, apiUrl } = useAuth();

  const getInterviews = async () => {
    try {
      const response = await axios.get(`${apiUrl}/interviews/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setInterviews(response.data?.data || []);
        secureLocalStorage.setItem(
          "interviews",
          JSON.stringify(response.data?.data || [])
        );
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const getResumes = async () => {
    try {
      const response = await axios.get(`${apiUrl}/resumes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setResumes(response.data?.data || []);
        secureLocalStorage.setItem(
          "resumes",
          JSON.stringify(response.data?.data || [])
        );
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  const loadData = () => {
    try {
      const interviewList = JSON.parse(
        secureLocalStorage.getItem("interviews")
      );
      const resumeList = JSON.parse(secureLocalStorage.getItem("resumes"));

      if (interviewList) setInterviews(interviewList);
      if (resumeList) setResumes(resumeList);

      // refresh in background for fresh data
      getInterviews();
      getResumes();
    } catch (error) {
      console.error("Error loading cached data:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && token) {
      loadData();
    } else {
      // clear state on logout
      setInterviews([]);
      setResumes([]);
    }
  }, [isAuthenticated, token]);

  const value = {
    resumes,
    interviews,
    setInterviews,
    setResumes,
    getInterviews,
    getResumes,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};

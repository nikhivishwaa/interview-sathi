import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useAuth } from "./AuthContext";
import logger from "../utils/logger";

const CodingContext = createContext(undefined);

export const CodingProvider = ({ children }) => {
  const [problemStatements, setProblemStatements] = useState([]);
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [compileResult, setCompileResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const { isAuthenticated, token, apiUrl } = useAuth();

  const getProblemStatements = async (setLoader) => {
    try {
      const response = await axios.get(`${apiUrl}/coding/ps/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { data } = response.data;
        setProblemStatements(data || []);
        secureLocalStorage.setItem(
          "problemStatements",
          JSON.stringify(data || [])
        );
        logger({ data });
      }
    } catch (error) {
      console.error("Error fetching problemStatements:", error);
    } finally {
      setLoader(false);
    }
  };

  const loadData = (setLoader) => {
    try {
      setLoader(true);
      const ProblemStatementList = JSON.parse(
        secureLocalStorage.getItem("problemStatements")
      );

      if (ProblemStatementList) {
        setLoader(false);
        setProblemStatements(ProblemStatementList);
      }

      // refresh in background for fresh data
      getProblemStatements(setLoader);
    } catch (error) {
      console.error("Error loading cached data:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // clear state on logout
      setProblemStatements([]);
      setProblem([]);
    }
  }, [isAuthenticated, token]);

  const value = {
    problemStatements,
    getProblemStatements,
    setProblemStatements,
    getProblemStatements,
    problem,
    setProblem,
    code,
    setCode,
    compileResult,
    setCompileResult,
    submissionResult,
    setSubmissionResult,
  };

  return (
    <CodingContext.Provider value={value}>{children}</CodingContext.Provider>
  );
};

export const useCoding = () => {
  const context = useContext(CodingContext);
  if (context === undefined) {
    throw new Error("useCoding must be used within an CodingProvider");
  }
  return context;
};

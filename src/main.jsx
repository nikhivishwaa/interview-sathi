import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { InterviewProvider } from "./context/InterviewContext";
import "./index.css";
import { CodingProvider } from "./context/CodingContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <InterviewProvider>
          <CodingProvider>
            <App />
          </CodingProvider>
        </InterviewProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

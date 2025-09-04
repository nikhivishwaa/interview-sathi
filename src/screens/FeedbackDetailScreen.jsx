import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  feedbackImpovementSvg,
  feedbackStrengthSvg,
} from "../data/SvgImageData";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { sendAnalytics } from "../utils/firebase";
import logger from "../utils/logger";

const API = import.meta.env.VITE_BACKEND;
const FeedbackDetailScreen = () => {
  const { id } = useParams();
  const route = useLocation();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        logger({ token });
        setLoading(true);
        const response = await axios.get(`${API}/feedback/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          logger({ data: response.data });
          const { data } = response.data;

          if (route?.state?.lazyload) {
            sendAnalytics("feedback_generated", {
              interview_id: id,
              overall_score: data.overall_score || 0,
              technical: data.scores?.technical || 0,
              communication: data.scores?.communication || 0,
              grammar: data.scores?.grammar || 0,
              relevance: data.scores?.relevance || 0,
            });
          }
          // Create a mock feedback for demonstration
          const mockFeedback = {
            id,
            overallScore: data.overall_score || 0,
            technicalScore: data.scores?.technical || 0,
            communicationScore: data.scores?.communication || 0,
            grammarScore: data.scores?.grammar || 0,
            relevanceScore: data.scores?.relevance || 0,
            strengths: data.strengths || [],
            improvements: data.improvements || [],
            detailedFeedback: data.detailed_feedback || "",
            behavioralFeedback: data.behavioral_feedback || "",
          };

          setFeedback(mockFeedback);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        if (error?.response?.status === 404) toast.error("Interview Not Exist");
        else toast.error("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    if (route?.state?.lazyload) setTimeout(fetchFeedback, 10000);
    else fetchFeedback();
  }, []);

  if (loading) {
    return (
      <main className="screen-bg min-h-screen">
        <AnalyticsTracker screenName="FeedbackDetailScreen" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <svg
                className="animate-spin h-10 w-10 text-sathi-primary mx-auto"
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
              <p className="mt-4 text-gray-600">Loading feedback...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!feedback) {
    return (
      <main className="screen-bg min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-600">Feedback not found</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="screen-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="sathi-card mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Interview Feedback
              </h2>
              <Link
                to="/dashboard"
                className="text-sathi-primary text-sm font-medium hover:underline mt-2 md:mt-0"
              >
                Back to Dashboard
              </Link>
            </div>

            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg h-full">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Overall Performance
                  </h3>

                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full bg-sathi-primary flex items-center justify-center text-white font-bold text-lg">
                      {feedback.overallScore}%
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {feedback.overallScore >= 90
                          ? "Excellent"
                          : feedback.overallScore >= 75
                          ? "Good"
                          : feedback.overallScore >= 50
                          ? "Average"
                          : feedback.overallScore > 20
                          ? "Needs Improvement"
                          : "Poor"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Overall Assessment
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Technical</span>
                        <span className="text-sm font-medium text-gray-900">
                          {feedback.technicalScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sathi-primary rounded-full h-2"
                          style={{ width: `${feedback.technicalScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">
                          Communication
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {feedback.communicationScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sathi-primary rounded-full h-2"
                          style={{ width: `${feedback.communicationScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Relevance</span>
                        <span className="text-sm font-medium text-gray-900">
                          {feedback.relevanceScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sathi-primary rounded-full h-2"
                          style={{ width: `${feedback.relevanceScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-700">Grammar</span>
                        <span className="text-sm font-medium text-gray-900">
                          {feedback.grammarScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sathi-primary rounded-full h-2"
                          style={{ width: `${feedback.grammarScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 px-4 mb-6">
                <div className="h-full">
                  {feedback.strengths.length > 0 && (
                    <h3 className="font-medium text-gray-900 mb-3">
                      Strengths
                    </h3>
                  )}
                  <ul className="space-y-2 mb-6">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        {feedbackStrengthSvg}
                        <span className="text-sm text-gray-700">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {feedback.improvements?.length > 0 && (
                    <h3 className="font-medium text-gray-900 mb-3">
                      Areas for Improvement
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {feedback.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start">
                        {feedbackImpovementSvg}
                        <span className="text-sm text-gray-700">
                          {improvement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {feedback?.behavioralFeedback && (
              <div className="border-t border-gray-200 pt-6 mt-2">
                <h3 className="font-medium text-gray-900 mb-3">
                  Behavioral Feedback
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {feedback?.behavioralFeedback}
                </p>
              </div>
            )}
            <div className="border-t border-gray-200 pt-6 mt-2">
              <h3 className="font-medium text-gray-900 mb-3">
                Detailed Feedback
              </h3>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {feedback?.detailedFeedback}
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/interviews/schedule"
              className="sathi-btn-primary inline-flex"
            >
              Schedule Another Interview
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeedbackDetailScreen;

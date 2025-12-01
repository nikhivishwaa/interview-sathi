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
import PDFViewer from "../components/PDFViewer";
import { ArrowDown, Download, Eye } from "lucide-react";

const FeedbackDetailScreen = () => {
  const { id } = useParams();
  const route = useLocation();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState("");
  const { token, apiUrl } = useAuth();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        logger({ token });
        setLoading(true);
        const response = await axios.get(`${apiUrl}/feedbacks/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          logger({ data: response.data });
          const { data } = response.data;

          if (route?.state?.lazyload) {
            const m = data?.metadata;
            sendAnalytics("feedback_generated", {
              interview_id: id,
              overall_score: m.overall_score || 0,
              technical: m.scores?.technical || 0,
              communication: m.scores?.communication || 0,
              relevance: m.scores?.relevance || 0,
              confidence: m.scores?.confidence || 0,
              culture_fit: m?.scores?.culture_fit || 0,
              skills: Object.keys(m.skills),
              traits: Object.keys(m.traits),
            });
          }
          // Create a mock feedback for demonstration
          // const mockFeedback = {
          //   id,
          //   overallScore: data.overall_score || 0,
          //   technicalScore: data.scores?.technical || 0,
          //   communicationScore: data.scores?.communication || 0,
          //   grammarScore: data.scores?.grammar || 0,
          //   relevanceScore: data.scores?.relevance || 0,
          //   strengths: data.strengths || [],
          //   improvements: data.improvements || [],
          //   detailedFeedback: data.detailed_feedback || "",
          //   behavioralFeedback: data.behavioral_feedback || "",
          // };

          // setFeedback(mockFeedback);
          setFeedback(data);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        if (error?.response?.status === 404) toast.error("Interview Not Exist");
        else toast.error("Failed to load feedback");
      } finally {
        setLoading(false);
      }
    };

    // if (route?.state?.lazyload) setTimeout(fetchFeedback, 10000);
    // else fetchFeedback();
    fetchFeedback();
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
                      {Math.round(feedback.metadata.overall_score)}%
                    </div>
                    <div className="ml-4">
                      <div className="font-medium text-gray-900">
                        {feedback?.metadata?.overall_score >= 90
                          ? "Excellent"
                          : feedback?.metadata?.overall_score >= 75
                          ? "Good"
                          : feedback?.metadata?.overall_score >= 50
                          ? "Average"
                          : feedback?.metadata?.overall_score > 20
                          ? "Needs Improvement"
                          : "Poor"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Overall Assessment
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {Object.keys(feedback?.metadata?.scores)?.map(
                      (parameter, key) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-700 capitalize">
                              {parameter.replaceAll("_", " ")}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {Math.round(
                                feedback.metadata.scores[parameter] * 10
                              ) / 10}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-sathi-primary rounded-full h-2"
                              style={{
                                width: `${feedback.metadata.scores[parameter]}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 px-4 mb-6">
                <div className="h-full">
                  {feedback.report && (
                    <h3 className="font-medium text-gray-900 mb-3">
                      Detailed Feedback Report
                    </h3>
                  )}
                  <span className="flex justify-center mb-4 items-center w-full rounded-md h-40 bg-gray-100">
                    {/* <span className="flex flex-wrap w-1/2 rounded-md h-40 bg-gray-100"> */}
                    {/* {Object.keys(feedback.metadata.skills).map((skill, key) => (
                      <span className="rounded-full text-black p-2 px-4 bg-blue-100">
                        {skill.replaceAll(/[-_]+/g, " ")}
                      </span>
                    ))} */}
                    <img
                      src="/icons/report.png"
                      alt="report"
                      className="block h-[80%]"
                    />
                  </span>
                  <div className="flex gap-4 justify-center items-center">
                    <button
                      className="sathi-btn-primary inline-flex p-1 px-3"
                      onClick={() => {
                        const reportUrl = feedback.report;
                        const a = document.createElement("a");
                        a.href = reportUrl;
                        a.download = `Feedback Report - ${new Date().toDateString()}.pdf`;
                        a.target = "_blank";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      <ArrowDown className="w-5 h-5 font-bold mr-2" /> Download
                    </button>
                    <button
                      className="sathi-btn-primary inline-flex p-1 px-3"
                      onClick={() => setPreviewFile(feedback?.report)}
                    >
                      <Eye className="w-5 h-5 font-bold mr-2" /> Preview
                    </button>
                  </div>
                  <div className="h-full">
                    {feedback?.strengths?.length > 0 && (
                      <h3 className="font-medium text-gray-900 mb-3">
                        Strengths
                      </h3>
                    )}
                    <ul className="space-y-2 mb-6">
                      {feedback?.strengths?.map((strength, index) => (
                        <li key={index} className="flex items-start">
                          {feedbackStrengthSvg}
                          <span className="text-sm text-gray-700">
                            {strength}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {feedback?.improvements?.length > 0 && (
                      <h3 className="font-medium text-gray-900 mb-3">
                        Areas for Improvement
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {feedback?.improvements?.map((improvement, index) => (
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
      </div>
      {previewFile && (
        <PDFViewer fileUrl={previewFile} onClose={() => setPreviewFile("")} />
      )}
    </main>
  );
};

export default FeedbackDetailScreen;

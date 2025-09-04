import React from "react";
import { Link } from "react-router-dom";
import { feedbackImpovementSvg } from "../data/SvgImageData";

const RecentFeedback = ({ interviews, loading = false }) => {
  // Filter only interviews with feedback
  const interviewsWithFeedback = interviews.filter(
    (interview) => interview?.metadata?.feedback
  );

  if (loading) {
    return (
      <div className="sathi-card animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="border-b border-gray-100 py-4 last:border-0 last:pb-0"
          >
            <div className="flex justify-between mb-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/5"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="sathi-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Feedback
      </h3>

      {interviewsWithFeedback.length === 0 ? (
        <div className="text-center py-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <p className="mt-2 text-gray-500">No feedback available yet</p>
          <p className="mt-1 text-sm text-gray-400">
            Complete an interview to get feedback
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {interviewsWithFeedback.slice(0, 3).map((interview) => (
            <div
              key={interview.id}
              className="border-b border-gray-100 py-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-900">
                  {new Date(interview?.ended_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    Score: {interview.metadata.feedback?.overall_score}%
                  </span>
                  <div
                    className={`w-2 h-2 ml-2 rounded-full ${
                      (interview?.metadata?.feedback?.overall_score || 0) >= 90
                        ? "bg-[#d800ff]"
                        : (interview?.metadata?.feedback?.overall_score || 0) >=
                          75
                        ? "bg-[#0098ff]"
                        : (interview?.metadata?.feedback?.overall_score || 0) >=
                          50
                        ? "bg-[#06e55c]"
                        : (interview?.metadata?.feedback?.overall_score || 0) >
                          20
                        ? "bg-[#ffad19]"
                        : "bg-[#ff0000]"
                    }`}
                  ></div>
                </div>
              </div>
              <div className="text-sm text-gray-500 line-clamp-2 mb-1 flex">
                {feedbackImpovementSvg}{" "}
                {interview?.metadata?.feedback?.improvements[0]}
              </div>
              <Link
                to={`/feedback/${interview?.id}`}
                className="text-xs text-sathi-primary hover:underline"
              >
                View detailed feedback
              </Link>
            </div>
          ))}

          {interviewsWithFeedback.length > 3 && (
            <div className="pt-4 text-center">
              <Link
                to="/feedback"
                className="text-sm text-sathi-primary hover:underline font-medium"
              >
                View all feedback
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentFeedback;

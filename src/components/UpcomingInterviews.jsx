import React from "react";
import { Link } from "react-router-dom";

const UpcomingInterviews = ({ interviews, onCancel, loading = false }) => {
  if (loading) {
    return (
      <div className="sathi-card animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-b border-gray-100 py-4 last:border-0 last:pb-0"
          >
            <div className="flex justify-between mb-2">
              <div className="h-5 bg-gray-200 rounded w-1/4"></div>
              <div className="h-5 bg-gray-200 rounded w-1/5"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="sathi-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Interviews
      </h3>

      {interviews.length === 0 ? (
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-gray-500">No upcoming interviews</p>
          <Link
            to="/interviews/schedule"
            className="mt-4 inline-block sathi-btn-primary"
          >
            Schedule Interview
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border-b border-gray-100 py-4 last:border-0 last:pb-0"
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-900">
                  {new Date(interview.scheduled_at).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
                <span className="text-gray-600">
                  {new Date(interview.scheduled_at).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "2-digit", hour12: true }
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {interview.role} Developer Interview
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onCancel(interview.id)}
                    className="text-sm text-gray-600 hover:text-red-500"
                  >
                    Cancel
                  </button>
                  {new Date(`${interview.scheduled_at}`) <=
                    new Date(Date.now() + 15 * 60 * 1000) && (
                    <Link
                      to={`/interview/${interview.id}`}
                      className="text-sm text-sathi-primary hover:text-sathi-primary/80 font-medium"
                    >
                      Join
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 text-center">
            <Link
              to="/interviews/schedule"
              className="text-sm text-sathi-primary hover:underline font-medium"
            >
              Schedule another interview
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingInterviews;

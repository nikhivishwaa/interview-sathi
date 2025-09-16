import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  FileText,
  ClipboardList,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useInterview } from "../context/InterviewContext";
import AnalyticsTracker from "../components/AnalyticsTracker";
import logger from "../utils/logger";
import PDFViewer from "../components/PDFViewer";
import { useAuth } from "../context/AuthContext";

export default function FeedbackScreen() {
  const { interviews, resumes } = useInterview();
  const [previewResume, setPreviewResume] = useState(null);
  const { apiUrl } = useAuth();

  const getResumeMap = (resumeList) => {
    const obj = {};
    for (const resume of resumeList) {
      obj[`r${resume.id}`] = resume;
    }
    logger({ obj, interviews });
    return obj;
  };

  const resumeMap = getResumeMap(resumes);
  const feedbacks = interviews.filter(
    (i) => i.status === "completed" && i.metadata?.feedback
  );

  // Filters state
  const [topN, setTopN] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Apply filters
  const filteredFeedbacks = useMemo(() => {
    let list = [...feedbacks];

    // Filter by date
    if (fromDate) {
      list = list.filter((i) => new Date(i.created_at) >= new Date(fromDate));
    }
    if (toDate) {
      list = list.filter(
        (i) => new Date(i.created_at) <= new Date(new Date(toDate).getTime() + 24*3600*1000)
      );
    }

    // Sort by newest first
    list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Limit Top N
    if (topN !== "all") {
      list = list.slice(0, Number(topN));
    }

    return list;
  }, [feedbacks, topN, fromDate, toDate]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <AnalyticsTracker screenName="FeedbackScreen" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Interview Feedback
            </h1>
            <p className="text-gray-500">
              Reflect on your journey and see how you’ve grown
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 bg-white shadow-sm border rounded-xl px-4 py-2">
            <Filter className="h-4 w-4 text-gray-400" />

            {/* Top N */}
            <select
              className="border rounded-md text-sm px-2 py-1"
              value={topN}
              onChange={(e) => setTopN(e.target.value)}
            >
              <option value="5">Top 5</option>
              <option value="10">Top 10</option>
              <option value="20">Top 20</option>
              <option value="all">All</option>
            </select>

            {/* From Date */}
            <input
              type="date"
              className="border rounded-md text-sm px-2 py-1"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />

            {/* To Date */}
            <input
              type="date"
              className="border rounded-md text-sm px-2 py-1"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-8">
          {filteredFeedbacks.map((interview) => (
            <div
              key={interview.id}
              className="relative group bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200 p-6"
            >
              {/* Header Row */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Feedback for{" "}
                    <span className="text-indigo-600">
                      Interview #{interview.id}
                    </span>
                  </h2>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(interview.created_at).toLocaleString()}
                  </p>
                </div>

                {/* View button */}
                <Link
                  to={`/feedback/${interview.id}`}
                  className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition"
                >
                  View Details <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              {/* Info Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-5">
                <div className="flex items-center space-x-3">
                  <ClipboardList className="h-5 w-5 text-indigo-500" />
                  <span className="text-gray-700">
                    Score:{" "}
                    <span className="font-semibold">
                      {interview.metadata?.feedback?.overall_score ?? "N/A"}/100
                    </span>
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-indigo-500" />
                  <button
                    onClick={() =>
                      setPreviewResume(resumeMap[`r${interview.resume}`])
                    }
                    className="text-gray-700 hover:text-indigo-600 font-medium"
                  >
                    Resume #{resumeMap[`r${interview.resume}`].name}
                  </button>
                </div>

                <div className="flex items-center space-x-3">
                  <ClipboardList className="h-5 w-5 text-indigo-500" />
                  <span className="capitalize text-gray-700 hover:text-indigo-600 font-medium">
                    {interview.role} Interview
                  </span>
                </div>
              </div>

              {/* Hover Accent Bar */}
              <div className="absolute top-0 left-0 h-full w-1 bg-indigo-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}

          {filteredFeedbacks.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No feedbacks found for given filters.
            </p>
          )}
        </div>

        {previewResume && (
          <PDFViewer
            fileUrl={apiUrl + previewResume.file}
            onClose={() => setPreviewResume(null)}
          />
        )}
      </div>
    </>
  );
}

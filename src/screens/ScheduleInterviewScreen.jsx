import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useInterview } from "../context/InterviewContext";
import axios from "axios";
import { spinner } from "../data/SvgImageData";
import AutocompleteSearch from "../components/AutocompleteSearch";
import AnalyticsTracker from "../components/AnalyticsTracker";
import { sendAnalytics } from "../utils/firebase";
import PDFViewer from "../components/PDFViewer";

const ScheduleInterviewScreen = () => {
  const [previewResume, setPreviewResume] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [jobRole, setJobRole] = useState("frontend");
  const [jd, setJD] = useState("");
  const [scheduling, setScheduling] = useState(false);
  const navigate = useNavigate();
  const { getAuthHeader, apiUrl } = useAuth();
  const { resumes, interview, setInterview } = useInterview();

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 14);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const validateDateTime = (date, time) => {
    const selectedDateTime = new Date(`${date}T${time}`);
    const currentDateTime = new Date();
    return selectedDateTime > currentDateTime;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) return toast.error("Please select Date");
    if (!time) return toast.error("Please select Time");
    if (!resumeId) return toast.error("Please Select a Resume");
    if (!(jd.length > 30))
      return toast.error("Please Enter Valid Job Description");
    if (!validateDateTime(date, time))
      return toast.error("Please select a valid date and time in the future");

    const schedule = new Date(`${date}T${time}`).toJSON();
    setDateTime(schedule);
    setScheduling(true);
    scheduleInterview(schedule);
    navigate("/dashboard");
  };

  const scheduleInterview = async (scheduled_at) => {
    try {
      const response = await axios.post(
        `${apiUrl}/interviews/`,
        {
          resume_id: resumeId,
          scheduled_at: scheduled_at,
          role: jobRole,
          job_desc: jd,
        },
        getAuthHeader()
      );
      if (response.status === 201) {
        toast.success("Interview Scheduled Successfully");
        setInterview([...interview, response.data?.data]);
        sendAnalytics("interview_scheduled", {
          interview_id: id,
          resume_id: resumeId,
          role: jobRole,
        });
      }
    } catch (error) {
      console.error("Error scheduling interview:", error);
      toast.error(
        error?.response?.data?.message || "Error scheduling interview"
      );
    } finally {
      setScheduling(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <AnalyticsTracker screenName="ScheduleInterviewScreen" />
      {/* Gradient Header */}
      {/* <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-12 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Schedule Your Interview</h1>
          <p className="text-lg opacity-90">
            Pick a role, upload your resume, and choose your slot
          </p>
        </div>
      </div> */}


<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 text-white py-14 shadow-md">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-2">
      Schedule Your <span className="text-yellow-200">Interview</span>
    </h1>
    <p className="text-lg md:text-xl opacity-90">
      Pick a role, upload your resume, and choose your slot
    </p>
  </div>
</div>


      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="sathi-card p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Interview Details
            </h2>






            <form onSubmit={handleSubmit} className="space-y-8">
  {/* Job Role */}
  <div>
    <label
      htmlFor="jobRole"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Job Role
    </label>
    <select
      id="jobRole"
      value={jobRole}
      onChange={(e) => setJobRole(e.target.value)}
      className="sathi-input border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
      required
    >
      <option value="frontend">Frontend Developer</option>
      <option value="backend">Backend Developer</option>
    </select>
  </div>

  {/* Date & Time */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label
        htmlFor="date"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Date
      </label>
      <input
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={minDate}
        max={maxDateString}
        className="sathi-input border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
        required
      />
    </div>
    <div>
      <label
        htmlFor="time"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Time
      </label>
      <input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="sathi-input border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all duration-300"
        required
      />
    </div>
  </div>

  {/* Resume Selection */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-4">
      Select Resume
    </label>
    <div className="grid gap-4">
      {resumes.map((r) => (
        <label
          key={r.id}
          htmlFor={`res-${r.id}`}
          className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition transform hover:scale-[1.03] hover:shadow-lg duration-300 ${
            resumeId == r.id
              ? "border-indigo-500 bg-indigo-50 shadow-md"
              : "border-gray-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id={`res-${r.id}`}
              name="resume_id"
              value={r.id}
              checked={resumeId == r.id}
              onChange={(e) => setResumeId(e.target.value)}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-gray-800 font-medium">
              📄 {r.name.length >= 15 ? r.name.slice(0, 15) + "..." : r.name}
            </span>
            <span className="text-gray-500 text-sm">
              ({new Date(r.uploaded_at).toLocaleDateString()})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPreviewResume(r)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
          >
            Preview ↗
          </button>
        </label>
      ))}
    </div>
  </div>

  {/* Job Description */}
  <div>
    <label
      htmlFor="jd"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Job Description
    </label>
    <textarea
      rows={5}
      id="jd"
      value={jd}
      onChange={(e) => setJD(e.target.value)}
      className="sathi-input border-gray-300 rounded-lg px-4 py-2 w-full shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none transition-all duration-300"
      required
      placeholder="Paste the job description here..."
    />
  </div>

  {/* Submit Button */}
  <div className="pt-4">
    <button
      type="submit"
      disabled={scheduling}
      className="sathi-btn-primary w-full py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
    >
      {scheduling ? (
        <>
          {spinner} Scheduling...
        </>
      ) : (
        "Schedule Interview"
      )}
    </button>
  </div>
</form>






          </div>
        </div>
      </div>
      {previewResume && (
        <PDFViewer
          fileUrl={apiUrl + previewResume.file}
          onClose={() => setPreviewResume(null)}
        />
      )}
    </main>
  );
};

export default ScheduleInterviewScreen;

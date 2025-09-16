import React, { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Briefcase,
  ExternalLink,
  Save,
  BriefcaseIcon,
  IndianRupeeIcon,
  Pin,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import AnalyticsTracker from "../components/AnalyticsTracker";

function JobDetailsScreen() {
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [job, setJob] = useState({});
  const route = useLocation();

  useEffect(() => {
    if (route?.state?.job) {
      const jobData = route.state.job;
      setJob(jobData);
      document.title = `${jobData.title} by ${jobData.companyName}`;
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  const fullJDUrl = job?.jdURL;

  // Logo fallback
  const logo = job.logoPathV3 || job.logoPath || job.logo || null;

  // Parse tags/skills
  const skills = useMemo(() => {
    if (!job.tagsAndSkills) return [];
    return job.tagsAndSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [job.tagsAndSkills]);

  // Placeholders map e.g. experience, salary, location
  const placeholders = job.placeholders || [];

  // Created/Updated timestamps (some APIs return ms)
  const createdAt = job.createdDate
    ? new Date(Number(job.createdDate)).toLocaleString()
    : "";

  const updatedAt = job.updated_at
    ? new Date(job.updated_at).toLocaleString()
    : null;

  // Salary display helper
  const salaryText = (() => {
    if (job.salaryDetail) {
      const s = job.salaryDetail;
      if (s.hideSalary || (s.minimumSalary === 0 && s.maximumSalary === 0)) {
        return "Not disclosed";
      }
      if (s.minimumSalary && s.maximumSalary) {
        return `${
          s.currency || job.currency || "INR"
        } ${s.minimumSalary.toLocaleString()} - ${s.maximumSalary.toLocaleString()}`;
      }
    }
    // fallback to placeholders
    const sal = placeholders.find((p) => p.type === "salary");
    return sal?.label || "Not disclosed";
  })();

  const storageKey = `job_saved_${job?.jobId}`;
  const [saved, setSaved] = useState(() => {
    try {
      const v = localStorage.getItem(storageKey);
      return v ? JSON.parse(v) : !!job.isSaved || !!job.saved;
    } catch {
      return !!job.isSaved || !!job.saved;
    }
  });

  const toggleSave = () => {
    setSaved((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullJDUrl);
      // you can replace with toast
      alert("Job URL copied to clipboard");
    } catch {
      alert("Copy failed — please copy manually.");
    }
  };

  // sanitize jobDescription if DOMPurify exists
  let safeDescription = job.jobDescription || "";
  try {
    if (typeof window !== "undefined" && window.DOMPurify) {
      safeDescription = window.DOMPurify.sanitize(safeDescription);
    }
  } catch (e) {
    // ignore — we'll use raw HTML fallback (not ideal)
  }

  // helper to show placeholder items
  const getPlaceholderLabel = (type) =>
    placeholders.find((p) => p.type === type)?.label || null;

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 bg-">
        <AnalyticsTracker screenName="JobsScreen" />
        <div className="h-40 bg-gray-200 rounded-md mb-5 w-full animate-pulse"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* MAIN COLUMN */}
          <main className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border-card p-6">
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-lg bg-gray-100 animate-pulse" />
                <div className="flex-1">
                  <span className="bg-gray-200 w-3/4 rounded animate-pulse" />
                  <span className="bg-gray-200 w-1/4 rounded animate-pulse" />

                  <div className="space-y-3 mt-3">
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/5 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                </div>
                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <div className="w-22 h-9 rounded-md animate-pulse bg-gray-100"></div>
                  <div className="w-22 h-9 rounded-md animate-pulse bg-gray-100"></div>
                </div>
              </div>
            </div>
            {/* Job description */}
            <section className="bg-white rounded-2xl p-6 border-card">
              <h2 className="w-2/5 h-6 rounded-md animate-pulse bg-gray-100 mb-3"></h2>

              <div className="space-y-3">
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
              </div>
            </section>
          </main>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 sticky top-24 space-y-4">
            <section className="bg-white p-4 rounded-lg border-card">
              <div className="flex gap-4 items-start">
                <span className="w-20 h-20 rounded-lg bg-gray-100 animate-pulse" />
                <div className="flex flex-col gap-3 justify-center mt-2">
                  <span className="h-6 w-36 rounded-md animate-pulse bg-gray-100"></span>
                  <span className="h-6 w-36 rounded-md animate-pulse bg-gray-100"></span>
                </div>
              </div>

              <div className="mt-4 w-4/5 h-5 rounded-md animate-pulse bg-gray-100"></div>

              {/* Quick info */}
              <div className="mt-4 space-y-1">
                <div className="mt-4 w-4/5 h-5 rounded-md animate-pulse bg-gray-100"></div>
                <div className="mt-4 w-4/5 h-5 rounded-md animate-pulse bg-gray-100"></div>
                <div className="mt-4 w-4/5 h-5 rounded-md animate-pulse bg-gray-100"></div>
              </div>

              {/* Action row */}
              <div className="mt-4 flex gap-2">
                <span className="w-4/5 h-9 rounded-md animate-pulse bg-gray-100"></span>
                <span className="w-1/5 h-9 rounded-md animate-pulse bg-gray-100"></span>
              </div>
            </section>

            {/* Tags (sidebar) */}
            <div className="bg-white p-4 rounded-lg border-card">
              <div className="animate-pulse bg-gray-100 w-1/2 h-6 mb-2 rounded md"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((t, i) => (
                  <span
                    key={i}
                    className="w-18 h-7 rounded-full animate-pulse bg-gray-100"
                  ></span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 bg-">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN COLUMN */}
        <main className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
            <div className="flex gap-4 items-start">
              {logo ? (
                <img
                  src={logo}
                  alt={job.companyName}
                  className="w-20 h-20 object-contain rounded-lg p-2 bg-white shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-lg bg-gray-100 shadow-sm">
                  <BriefcaseIcon className="text-gray-500" />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="text-gray-600 mt-1 font-medium">
                  {job.companyName}
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-700">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />{" "}
                    {job.placeholders?.find((p) => p.type === "location")
                      ?.label || "-"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} /> {job.experienceText || "-"}
                  </span>
                  <span className="flex items-center gap-1">
                    <IndianRupeeIcon size={14} /> {salaryText}
                  </span>
                  <span className="flex items-center gap-1">
                    <Pin size={14} /> {job.workMode || "On-site"}
                  </span>
                </div>
              </div>
              {/* Actions */}
              <div className="flex flex-col gap-2">
                <a
                  href={fullJDUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow"
                >
                  <ExternalLink size={16} /> Apply
                </a>
                <button
                  onClick={toggleSave}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 shadow ${
                    saved
                      ? "bg-yellow-50 text-yellow-700"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <Save size={16} /> {saved ? "Saved" : "Save"}
                </button>
              </div>
            </div>
          </div>
          {/* Job description */}
          <section className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-3">Job Description</h2>
            <div
              className={`prose prose-sm text-gray-800 max-w-none ${
                !expanded ? "line-clamp-6" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: job.jobDescription }}
            />
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-blue-600 text-sm hover:underline"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 sticky top-24 space-y-4">
          <div className="bg-white p-4 rounded-lg border-card">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() =>
                window.open(
                  fullJDUrl,
                  "_blank"
                )
              }
            >
              {logo ? (
                <img
                  src={logo}
                  alt={job.companyName}
                  className="w-16 h-16 object-contain rounded-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
              )}
              <div>
                <div className="text-sm text-gray-500">Company</div>
                <div className="font-semibold">{job.companyName}</div>
              </div>
            </div>

            {/* AmbitionBox / ratings */}
            {job.ambitionBoxData && (
              <div
                className="mt-4 text-sm font-semibold cursor-pointer"
                onClick={() => window.open(job.ambitionBoxData.Url, "_blank")}
              >
                ⭐ {job.ambitionBoxData.AggregateRating} |{" "}
                {job.ambitionBoxData.ReviewsCount} reviews
              </div>
            )}

            {/* Quick info */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <div>
                <strong>Job ID:</strong> {job.jobId}
              </div>
              <div>
                <strong>Company ID:</strong> {job.companyId}
              </div>
              <div>
                <strong>Posted at:</strong> {createdAt}
              </div>
            </div>

            {/* Action row */}
            <div className="mt-4 flex gap-2">
              <a
                href={fullJDUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
              >
                <ExternalLink size={16} /> Apply
              </a>
              <button
                onClick={toggleSave}
                className={`px-3 py-2 rounded-md border cursor-pointer ${
                  saved
                    ? "bg-yellow-50 border-yellow-400 text-yellow-700"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <Save size={16} />
              </button>
            </div>
          </div>

          {/* Tags (sidebar) */}
          {skills.length > 0 && (
            <div className="bg-white p-4 rounded-lg border-card">
              <div className="font-medium mb-2">Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((t, i) => (
                  <span
                    key={i}
                    className="px-[15px] py-[5px] capitalize border border-gray-300 transition-all text-gray-600 duration-100 hover:border-sathi-primary hover:text-sathi-primary font-semibold rounded-full text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default JobDetailsScreen;

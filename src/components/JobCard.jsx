import React, { useMemo, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  MapPin,
  Briefcase,
  BriefcaseIcon,
  Pin,
  Bookmark,
  ReceiptText,
  Hourglass,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();
  const savingRef = useRef();
  const openJobPage = () => {
    navigate(
      `/jobs/${job?.jobId}/?profile=${job?.title?.replace(" ", "%20")}&company=${
        job?.companyName
      }`,
      { state: { job } }
    );
  };

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
 
  const storageKey = `job_saved_${job?.jobId}`;
  const [saved, setSaved] = useState(() => {
    try {
      const v = secureLocalStorage.getItem(storageKey);
      return v ? JSON.parse(v) : !!job.isSaved || !!job.saved;
    } catch {
      return !!job.isSaved || !!job.saved;
    }
  });


  const toggleSave = () => {
    setSaved((prev) => {
      const next = !prev;
      try {
        secureLocalStorage.setItem(storageKey, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // helper to show placeholder items
  const getPlaceholderLabel = (type) =>
    placeholders.find((p) => p.type === type)?.label || null;

  return (
    <section
      className="lg:col-span-2 space-y-6 cursor-pointer"
      onClick={(e) => e.target !== savingRef.current && openJobPage()}
    >
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
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-gray-600 mt-1 font-medium">
              {job.companyName}
              {job.ambitionBoxData && (
                <span
                  className="mt-4 text-sm font-semibold cursor-pointer"
                  onClick={() => window.open(job.ambitionBoxData.Url, "_blank")}
                >
                  ⭐ {job.ambitionBoxData.AggregateRating} |{" "}
                  {job.ambitionBoxData.ReviewsCount} reviews
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin size={14} />{" "}
                {job.placeholders?.find((p) => p.type === "location")?.label ||
                  "-"}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase size={14} /> {job.experienceText || "-"}
              </span>
              <span className="flex items-center gap-1">
                <Pin size={14} /> {job.workMode || "On-site"}
              </span>
              <span className="flex items-center gap-1">
                <Hourglass size={14} /> {job.footerPlaceholderLabel}
              </span>
            </div>

            <div className="flex gap-3 mt-2 items-center text-sm text-gray-600">
              <span>
                <ReceiptText size={14} />
              </span>
              <span className="font-sans line-clamp-1">
                {job.jobDescription.replace(/<[^>]+>/g, "")}
              </span>
            </div>
            {skills.length > 0 && (
              <div className="flex items-center justify-start gap-3 mt-3 line-clamp-1">
                {skills.map((t, i) => (
                  <>
                    <span key={i} className="capitalize text-gray-500 text-sm">
                      {t}
                    </span>
                    {i < skills.length - 1 && (
                      <span
                        className="h-1 w-1 rounded-full bg-gray-400"
                        key={i + "-dot"}
                      ></span>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={toggleSave}
              ref={savingRef}
              className={`px-3 py-2 rounded-lg flex cursor-pointer items-center gap-2 shadow ${
                saved
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-white text-gray-700"
              }`}
            >
              <Bookmark size={16} /> {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobCard;

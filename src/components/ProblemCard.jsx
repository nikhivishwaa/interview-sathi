import React, { useMemo, useRef, useState } from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal";

function ProblemCard({ problem }) {
  const navigate = useNavigate();
  const solvingRef = useRef();
  const openProblemPage = () => {
    const problem_ = `problem=${problem?.title}`;
    const company = problem.companies.length
      ? `askedIn=${problem.companies.join("+")}`
      : "";
    const difficulty = `difficulty=${problem?.difficulty}`;
    const seoKey = `seoKey=${problem?.title?.replace(" ", "-")}`;
    const URL = `/practice/${problem?.id}?${[
      problem_,
      company,
      difficulty,
      seoKey,
    ]
      .join("&")
      .replaceAll(" ", "%20")}`;
    navigate(URL);
  };

  return (
    <section className="lg:col-span-2 space-y-6 cursor-pointer">
      <div className=" flex justify-between bg-white p-3 py-6 animate-fadeIn">
        <div className="flex gap-4 items-start">
          <Bookmark size={24} />

          <div className="flex flex-col items-start">
            <h1 className="text-xl font-bold text-gray-900">{problem.title}</h1>
            <TagManager
              companyTags={problem.companies}
              topicTags={problem.tags}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 self-end text-sm items-end">
          <button
            onClick={openProblemPage}
            ref={solvingRef}
            className="px-5 py-1 rounded-sm flex cursor-pointer font-semibold items-center gap-2 border hover:bg-green-700 hover:text-white border-green-700 bg-white text-green-700"
          >
            Solve
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <span key={1}>{problem?.difficulty || "NA"}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <span key={2}>2M</span>
            <span className="h-1 w-1 rounded-full bg-gray-300"></span>
            <span key={3}>{problem.score} %</span>
          </div>
        </div>
      </div>
    </section>
  );
}
const TagManager = ({ topicTags, companyTags }) => {
  const [open, setOpen] = useState(false);
  const companies =
    companyTags.length > 2 ? companyTags.slice(0, 2) : companyTags;
  if (!open)
    return (
      <div className="flex items-center justify-start gap-3 mt-3 line-clamp-1 capitalize text-green-600 text-xs font-semibold">
        {companies.map((company, i) => (
          <span key={i}>{company}</span>
        ))}
        {companyTags.length > 2 && (
          <span
            key={3}
            className=" bg-green-50 p-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            +{companyTags.length - 2} more
          </span>
        )}{" "}
      </div>
    );

  return (
    <CustomModal isOpen={open} setIsOpen={setOpen}>
      {/* Topic Tags */}
      <h2 className="text-lg font-semibold mb-3">Topic Tags</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {topicTags?.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 border border-gray-200 capitalize"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Company Tags */}
      <h2 className="text-lg font-semibold mb-3">Company Tags</h2>
      <div className="flex flex-wrap gap-2">
        {companyTags?.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-sm rounded-md bg-green-100 text-green-700 border border-green-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </CustomModal>
  );
};

export default ProblemCard;

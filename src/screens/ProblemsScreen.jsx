import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useCoding } from "../context/CodingContext";
import ProblemCard from "../components/ProblemCard";
import AnalyticsTracker from "../components/AnalyticsTracker";

function ProblemsScreen() {
  const [loading, setLoading] = useState(true);
  const { problemStatements, getProblemStatements } = useCoding();

  useEffect(() => {
    getProblemStatements(setLoading);
  }, []);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullJDUrl);
      // you can replace with toast
      alert("Job URL copied to clipboard");
    } catch {
      alert("Copy failed — please copy manually.");
    }
  };

  if (loading)
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 bg-">
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
      <AnalyticsTracker screenName="ProblemsScreen" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* SIDEBAR */}
        <aside className="lg:col-span-1 sticky top-24 space-y-4">
          <FilterSidebar />
        </aside>
        {/* MAIN COLUMN */}
        <main className="lg:col-span-2 space-y-1">
          {problemStatements.map((ps, key) => (
            <>
              <ProblemCard key={key} problem={ps} />
              {key < problemStatements.length - 1 && <div  key={key+'sep'} className="bg-gray-200 w-full h-[2px] rounded-full"/>}
            </>
          ))}
        </main>
      </div>
    </div>
  );
}

export default ProblemsScreen;

const FilterSidebar = () => {
  const [showCompanies, setShowCompanies] = useState(true);
  const [showTopics, setShowTopics] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showMySprints, setShowMySprints] = useState(false);
  const [showFeaturedSprints, setShowFeaturedSprints] = useState(false);

  return (
    <aside className="w-64 bg-white border-card rounded-2xl shadow p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
          Clear All
        </button>
      </div>

      {/* Companies */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Companies</h3>
          <button className="text-green-600 text-sm hover:underline">
            View All
          </button>
        </div>
        {showCompanies && (
          <div className="space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Amazon (633)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Microsoft (432)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Flipkart (167)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Google (163)
            </label>
          </div>
        )}
      </div>

      {/* Topics */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Topics</h3>
          <button className="text-green-600 text-sm hover:underline">
            View All
          </button>
        </div>
        {showTopics && (
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Show topic tag</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 transition"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Arrays (796)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Strings (450)
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Linked List (110)
            </label>
          </div>
        )}
      </div>

      {/* Collapsible sections */}
      <div>
        <button
          onClick={() => setShowDifficulty(!showDifficulty)}
          className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          Difficulty{" "}
          <ChevronDown
            size={16}
            className={`transform transition ${
              showDifficulty ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div>
        <button
          onClick={() => setShowStatus(!showStatus)}
          className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          Status{" "}
          <ChevronDown
            size={16}
            className={`transform transition ${showStatus ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <div>
        <button
          onClick={() => setShowMySprints(!showMySprints)}
          className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          My Sprints{" "}
          <ChevronDown
            size={16}
            className={`transform transition ${
              showMySprints ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      <div>
        <button
          onClick={() => setShowFeaturedSprints(!showFeaturedSprints)}
          className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
        >
          Featured Sprints{" "}
          <ChevronDown
            size={16}
            className={`transform transition ${
              showFeaturedSprints ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </aside>
  );
};

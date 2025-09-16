import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FilterSidebar = () => {
  const [showCompanies, setShowCompanies] = useState(true);
  const [showTopics, setShowTopics] = useState(true);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showMySprints, setShowMySprints] = useState(false);
  const [showFeaturedSprints, setShowFeaturedSprints] = useState(false);

  return (
    <aside className="w-64 bg-white border rounded-2xl shadow p-4 space-y-6">
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
          <button className="text-green-600 text-sm hover:underline">View All</button>
        </div>
        {showCompanies && (
          <div className="space-y-2 text-sm text-gray-700">
            <label className="flex items-center gap-2"><input type="checkbox"/> Amazon (633)</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Microsoft (432)</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Flipkart (167)</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Google (163)</label>
          </div>
        )}
      </div>

      {/* Topics */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-gray-700">Topics</h3>
          <button className="text-green-600 text-sm hover:underline">View All</button>
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
            <label className="flex items-center gap-2"><input type="checkbox"/> Arrays (796)</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Strings (450)</label>
            <label className="flex items-center gap-2"><input type="checkbox"/> Linked List (110)</label>
          </div>
        )}
      </div>

      {/* Collapsible sections */}
      <div>
        <button onClick={() => setShowDifficulty(!showDifficulty)} className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
          Difficulty <ChevronDown size={16} className={`transform transition ${showDifficulty ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div>
        <button onClick={() => setShowStatus(!showStatus)} className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
          Status <ChevronDown size={16} className={`transform transition ${showStatus ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div>
        <button onClick={() => setShowMySprints(!showMySprints)} className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
          My Sprints <ChevronDown size={16} className={`transform transition ${showMySprints ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div>
        <button onClick={() => setShowFeaturedSprints(!showFeaturedSprints)} className="w-full flex justify-between items-center py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
          Featured Sprints <ChevronDown size={16} className={`transform transition ${showFeaturedSprints ? "rotate-180" : ""}`} />
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;

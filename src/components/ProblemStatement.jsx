import React from "react";

export default function ProblemStatement({ problem }) {
  if (!problem) return <></>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Title and Metadata */}
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {problem.title}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <span>
            <strong>Difficulty:</strong> {problem.difficulty}
          </span>
          <span>
            <strong>Score:</strong> {problem.score}
          </span>
          <span>
            <strong>Visibility:</strong> {problem.visibility}
          </span>
          <span>
            <strong>Created At:</strong>{" "}
            {new Date(problem.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Statement */}
      <section className="mb-8">
        <p className="text-gray-800 leading-relaxed">{problem.statement}</p>
      </section>

      {/* Examples */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Examples:</h2>
        <div className="space-y-6">
          {problem.examples.map((ex, idx) => (
            <div key={idx} className="border rounded-lg bg-gray-50 p-4">
              <p className="mb-1">
                <strong>Input:</strong> {ex.input}
              </p>
              <p className="mb-1">
                <strong>Output:</strong> {ex.output}
              </p>
              <p className="text-gray-700">
                <strong>Explanation:</strong> {ex.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Constraints */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Constraints:</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {problem.constraints.map((c, idx) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Expected Complexities */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Expected Complexities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">
              Time Complexity
            </h3>
            <p className="text-gray-800 font-semibold">
              {problem.time_complexity}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-sm font-medium text-gray-500">
              Space Complexity
            </h3>
            <p className="text-gray-800 font-semibold">
              {problem.space_complexity}
            </p>
          </div>
        </div>
      </section>

      {/* Testcases */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Test Cases</h2>
        <div className="space-y-4">
          {problem.testcases.map((tc, idx) => (
            <div
              key={tc.id}
              className="p-4 bg-white border rounded-lg shadow-sm"
            >
              <p className="mb-1 font-mono">
                <strong>Input:</strong> {tc.input_data}
              </p>
              <p className="mb-1 font-mono">
                <strong>Expected Output:</strong> {tc.expected_output}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Company Tags</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {problem.companies.map((c, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {c}
            </span>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Topic Tags</h2>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

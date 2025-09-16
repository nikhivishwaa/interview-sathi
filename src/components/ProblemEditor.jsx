// import { useState } from "react";

// export default function ProblemAuthorForm() {
//   const [problem, setProblem] = useState({
//     title: "Indexes of Subarray Sum",
//     difficulty: "Medium",
//     statement: `Given an array arr[] containing only non-negative integers, your task is to find a continuous subarray whose sum equals a specified value target. You need to return the 1-based indices of the leftmost and rightmost elements of this subarray. If no such subarray exists, return [-1].`,
//     examples: [
//       {
//         input: "arr = [1, 2, 3, 7, 5], target = 12",
//         output: "[2, 4]",
//         explanation: "The sum of elements from 2nd to 4th position is 12."
//       },
//       {
//         input: "arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], target = 15",
//         output: "[1, 5]",
//         explanation: "The sum of elements from 1st to 5th position is 15."
//       }
//     ],
//     constraints: [
//       "1 <= arr.size() <= 10^6",
//       "0 <= arr[i] <= 10^3",
//       "0 <= target <= 10^9"
//     ],
//     complexities: {
//       time: "O(n)",
//       space: "O(1)"
//     },
//     visibility: "public"
//   });

//   // Handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProblem({ ...problem, [name]: value });
//   };

//   const handleExampleChange = (index, field, value) => {
//     const newExamples = [...problem.examples];
//     newExamples[index][field] = value;
//     setProblem({ ...problem, examples: newExamples });
//   };

//   const addExample = () => {
//     setProblem({
//       ...problem,
//       examples: [...problem.examples, { input: "", output: "", explanation: "" }]
//     });
//   };

//   const addConstraint = () => {
//     setProblem({ ...problem, constraints: [...problem.constraints, ""] });
//   };

//   const handleConstraintChange = (index, value) => {
//     const newConstraints = [...problem.constraints];
//     newConstraints[index] = value;
//     setProblem({ ...problem, constraints: newConstraints });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Problem JSON:", problem);
//     alert("Problem saved! Check console for JSON.");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
//       <h1 className="text-2xl font-bold mb-6">Problem Author Form</h1>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={problem.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           />
//         </div>

//         {/* Difficulty */}
//         <div>
//           <label className="block font-medium">Difficulty</label>
//           <select
//             name="difficulty"
//             value={problem.difficulty}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option>Easy</option>
//             <option>Medium</option>
//             <option>Hard</option>
//           </select>
//         </div>

//         {/* Statement */}
//         <div>
//           <label className="block font-medium">Problem Statement</label>
//           <textarea
//             name="statement"
//             value={problem.statement}
//             onChange={handleChange}
//             rows="5"
//             className="w-full p-2 border rounded-lg"
//           />
//         </div>

//         {/* Examples */}
//         <div>
//           <label className="block font-medium mb-2">Examples</label>
//           {problem.examples.map((ex, i) => (
//             <div key={i} className="border p-4 rounded-lg mb-2 space-y-2">
//               <input
//                 type="text"
//                 placeholder="Input"
//                 value={ex.input}
//                 onChange={(e) => handleExampleChange(i, "input", e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//               <input
//                 type="text"
//                 placeholder="Output"
//                 value={ex.output}
//                 onChange={(e) => handleExampleChange(i, "output", e.target.value)}
//                 className="w-full p-2 border rounded-lg"
//               />
//               <textarea
//                 placeholder="Explanation"
//                 value={ex.explanation}
//                 onChange={(e) =>
//                   handleExampleChange(i, "explanation", e.target.value)
//                 }
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addExample}
//             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg"
//           >
//             + Add Example
//           </button>
//         </div>

//         {/* Constraints */}
//         <div>
//           <label className="block font-medium mb-2">Constraints</label>
//           {problem.constraints.map((c, i) => (
//             <input
//               key={i}
//               type="text"
//               value={c}
//               onChange={(e) => handleConstraintChange(i, e.target.value)}
//               className="w-full p-2 border rounded-lg mb-2"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={addConstraint}
//             className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg"
//           >
//             + Add Constraint
//           </button>
//         </div>

//         {/* Complexities */}
//         <div>
//           <label className="block font-medium mb-2">Expected Complexities</label>
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Time Complexity"
//               value={problem.complexities.time}
//               onChange={(e) =>
//                 setProblem({
//                   ...problem,
//                   complexities: { ...problem.complexities, time: e.target.value }
//                 })
//               }
//               className="p-2 border rounded-lg"
//             />
//             <input
//               type="text"
//               placeholder="Space Complexity"
//               value={problem.complexities.space}
//               onChange={(e) =>
//                 setProblem({
//                   ...problem,
//                   complexities: { ...problem.complexities, space: e.target.value }
//                 })
//               }
//               className="p-2 border rounded-lg"
//             />
//           </div>
//         </div>

//         {/* Visibility */}
//         <div>
//           <label className="block font-medium">Visibility</label>
//           <select
//             name="visibility"
//             value={problem.visibility}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-lg"
//           >
//             <option value="public">Public</option>
//             <option value="private">Private</option>
//           </select>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//         >
//           Save Problem
//         </button>
//       </form>
//     </div>
//   );
// }
import { useState } from "react";

export default function ProblemAuthorForm() {
  const [problem, setProblem] = useState({
    title: "Indexes of Subarray Sum",
    difficulty: "Medium",
    statement: `Given an array arr[] containing only non-negative integers, your task is to find a continuous subarray whose sum equals a specified value target. You need to return the 1-based indices of the leftmost and rightmost elements of this subarray. If no such subarray exists, return [-1].`,
    examples: [
      {
        input: "arr = [1, 2, 3, 7, 5], target = 12",
        output: "[2, 4]",
        explanation: "The sum of elements from 2nd to 4th position is 12."
      }
    ],
    testcases: [
      { input: "5\n1 2 3 7 5\n12", output: "2 4" },
      { input: "3\n5 3 4\n2", output: "-1" }
    ],
    constraints: [
      "1 <= arr.size() <= 10^6",
      "0 <= arr[i] <= 10^3",
      "0 <= target <= 10^9"
    ],
    complexities: {
      time: "O(n)",
      space: "O(1)"
    },
    visibility: "public",
    score: 100
  });

  // --- handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblem({ ...problem, [name]: value });
  };

  const handleExampleChange = (index, field, value) => {
    const newExamples = [...problem.examples];
    newExamples[index][field] = value;
    setProblem({ ...problem, examples: newExamples });
  };

  const addExample = () => {
    setProblem({
      ...problem,
      examples: [...problem.examples, { input: "", output: "", explanation: "" }]
    });
  };

  const handleTestcaseChange = (index, field, value) => {
    const newCases = [...problem.testcases];
    newCases[index][field] = value;
    setProblem({ ...problem, testcases: newCases });
  };

  const addTestcase = () => {
    setProblem({
      ...problem,
      testcases: [...problem.testcases, { input: "", output: "" }]
    });
  };

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...problem.constraints];
    newConstraints[index] = value;
    setProblem({ ...problem, constraints: newConstraints });
  };

  const addConstraint = () => {
    setProblem({ ...problem, constraints: [...problem.constraints, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Problem JSON:", problem);
    alert("Problem saved! Check console for JSON.");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h1 className="text-3xl font-bold mb-8">Problem Author Form</h1>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* --- General Info --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">General Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={problem.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Difficulty</label>
              <select
                name="difficulty"
                value={problem.difficulty}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Score</label>
              <input
                type="number"
                name="score"
                value={problem.score}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* --- Statement --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Problem Statement</h2>
          <textarea
            name="statement"
            value={problem.statement}
            onChange={handleChange}
            rows="6"
            className="w-full p-3 border rounded-lg"
          />
        </section>

        {/* --- Examples --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Examples</h2>
          {problem.examples.map((ex, i) => (
            <div key={i} className="border p-4 rounded-lg mb-4 space-y-3">
              <div>
                <label className="block font-medium">Input</label>
                <input
                  type="text"
                  value={ex.input}
                  onChange={(e) =>
                    handleExampleChange(i, "input", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Output</label>
                <input
                  type="text"
                  value={ex.output}
                  onChange={(e) =>
                    handleExampleChange(i, "output", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Explanation</label>
                <textarea
                  value={ex.explanation}
                  onChange={(e) =>
                    handleExampleChange(i, "explanation", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addExample}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            + Add Example
          </button>
        </section>

        {/* --- Testcases --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Testcases</h2>
          {problem.testcases.map((tc, i) => (
            <div key={i} className="border p-4 rounded-lg mb-4 space-y-3">
              <div>
                <label className="block font-medium">Test Input</label>
                <textarea
                  value={tc.input}
                  onChange={(e) =>
                    handleTestcaseChange(i, "input", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Expected Output</label>
                <textarea
                  value={tc.output}
                  onChange={(e) =>
                    handleTestcaseChange(i, "output", e.target.value)
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTestcase}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            + Add Testcase
          </button>
        </section>

        {/* --- Constraints --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Constraints</h2>
          {problem.constraints.map((c, i) => (
            <input
              key={i}
              type="text"
              value={c}
              onChange={(e) => handleConstraintChange(i, e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addConstraint}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg"
          >
            + Add Constraint
          </button>
        </section>

        {/* --- Complexities --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Expected Complexities</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Time Complexity</label>
              <input
                type="text"
                value={problem.complexities.time}
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    complexities: {
                      ...problem.complexities,
                      time: e.target.value
                    }
                  })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium">Space Complexity</label>
              <input
                type="text"
                value={problem.complexities.space}
                onChange={(e) =>
                  setProblem({
                    ...problem,
                    complexities: {
                      ...problem.complexities,
                      space: e.target.value
                    }
                  })
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* --- Visibility --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Visibility</h2>
          <select
            name="visibility"
            value={problem.visibility}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </section>

        {/* --- Submit --- */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg text-lg hover:bg-green-700"
        >
          Save Problem
        </button>
      </form>
    </div>
  );
}

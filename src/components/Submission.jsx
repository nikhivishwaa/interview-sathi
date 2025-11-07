// import React, { useEffect, useRef, useState } from "react";
// import { cancelIcon } from "../data/imageData";
// import { useCoding } from "../context/CodingContext";
// import Loader from "./Loader";

// const inputSchema = [];

// function Submission({ problem }) {
//   const [active, setActive] = useState("cout");
//   const [testCaseIdx, setTestCaseIdx] = useState(1);
//   const [customInput, setCustomInput] = useState("");
//   const { compileResult, submissionResult, setCompileResult } = useCoding();

//   useEffect(() => {
//     if (!compileResult) setCompileResult(problem.testcases);
//   }, []);
//   return (
//     <div className="rounded-md w-full">
//       <header
//         className="flex flex-col bg-white sticky top-0 z-10 items-stretch justify-between"
//         style={{ borderRadius: "12px 12px 0px 0px" }}
//       >
//         <div className="flex justify-between bg-[#757575] text-white text-[18px] items-center py-2 px-5">
//           <h1>Output Window</h1>
//           <button className="w-6 h-6">
//             <img className="invert" src={cancelIcon} alt="Cancel" />
//           </button>
//         </div>
//         <div className="flex justify-start w-full gap-1 border-b-2 border-gray-400 items-center">
//           <button
//             className={`px-5 py-2 transition-all duration-100 ${
//               active === "cout" &&
//               "border-b-2 border-blue-500 text-blue-500 font-semibold"
//             } `}
//             onClick={() => setActive("cout")}
//           >
//             Compilation Result
//           </button>
//           <button
//             className={`px-5 py-2 transition-all duration-100 ${
//               active === "cin" &&
//               "border-b-2 border-blue-500 text-blue-500 font-semibold"
//             } `}
//             onClick={() => setActive("cin")}
//           >
//             Custom Input
//           </button>
//         </div>
//       </header>
//       {active === "cout" ? (
//         <>
//           {!compileResult ? (
//             <Loader />
//           ) : (
//             <>
//               <section className="m-6 flex gap-3 items-start border-b-2 pb-2 border-gray-400">
//                 {compileResult.map((res, key) => (
//                   <span
//                     className="bg-gray-200 cursor-pointer p-2 px-3 rounded-md"
//                     key={key}
//                     onClick={() => setTestCaseIdx(key)}
//                   >
//                     Case {key + 1}
//                   </span>
//                 ))}
//               </section>
//               {compileResult.map((res, key) => (
//                 <section
//                   className={`${
//                     testCaseIdx !== key ? "hidden" : "flex"
//                   } m-6 flex-col gap-3 p-6 rounded-md shadow-md items-start border-2 border-gray-100`}
//                   key={key}
//                 >
//                   {res?.status && (
//                     <div className="flex justify-end">
//                       <span
//                         className={`${
//                           res.status === "Accepted"
//                             ? "text-green-400"
//                             : "text-red-400"
//                         }`}
//                       >
//                         {res?.status}
//                       </span>
//                       <span className="bg-gray-200 p-2 px-3 rounded-md">
//                         {res?.time_taken} sec
//                       </span>
//                       <span className="text-red p-2 px-3">{res?.stderr}</span>
//                     </div>
//                   )}
//                   <div className="flex flex-col items-stretch w-full gap-2">
//                     <label className="font-semibold">Input:</label>
//                     <textarea
//                       readOnly={true}
//                       className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
//                       value={res?.input_data}
//                     ></textarea>
//                   </div>
//                   <div className="flex flex-col items-stretch w-full gap-2">
//                     <label className="font-semibold">Expected Output:</label>
//                     <textarea
//                       readOnly={true}
//                       className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
//                       value={res.expected_output}
//                     ></textarea>
//                   </div>
//                   <div className="flex flex-col items-stretch w-full gap-2">
//                     <label className="font-semibold">Code Output:</label>
//                     <textarea
//                       readOnly={true}
//                       className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
//                       value={res?.actual_output || ""}
//                     ></textarea>
//                   </div>
//                 </section>
//               ))}
//             </>
//           )}
//         </>
//       ) : (
//         <>
//           <section className="m-6 flex flex-col gap-3 items-start border-b-2 pb-2 border-gray-400">
//             <span className="bg-gray-200 p-2 px-3 rounded-md">Case 1</span>
//           </section>
//           <section className="m-6 flex flex-col gap-3 p-6 rounded-md shadow-md items-start border-2 border-gray-100">
//             <div className="flex flex-col items-stretch w-full gap-2">
//               <label className="font-semibold">Input:</label>
//               <textarea
//                 className="box-border p-2 block border-1 border-gray-200 rounded-sm"
//                 value={customInput}
//                 onChange={(e) => setCustomInput(e.target.value)}
//               ></textarea>
//             </div>
//             <div className="flex justify-start items-center w-full gap-2 my-2">
//               <button className="p-2 border-2 bg-white font-semibold shadow-md border-green-400 px-3 text-green-400 rounded-md">
//                 Code Output
//               </button>
//               <button className="p-2 border-2 bg-green-400 text-white font-semibold shadow-md border-green-400 px-3 rounded-md">
//                 Expected Output
//               </button>
//             </div>
//           </section>
//         </>
//       )}
//     </div>
//   );
// }

// export default Submission;
import React, { useEffect, useState } from "react";
import { cancelIcon } from "../data/imageData";
import { useCoding } from "../context/CodingContext";
import Loader from "./Loader";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";
import logger from "../utils/logger";

function Submission({ problem }) {
  const [active, setActive] = useState("cout");
  const [testCaseIdx, setTestCaseIdx] = useState(0);
  const [customCases, setCustomCases] = useState([
    { input_data: "", expected_output: "" },
  ]);
  const { compileResult, setCompileResult } = useCoding();

  useEffect(() => {
    if (!compileResult) setCompileResult(problem.testcases);
    logger({compileResult})
  }, [compileResult, setCompileResult, problem.testcases]);

  const addCustomCase = () => {
    if (customCases.length < 10) {
      setCustomCases([...customCases, { input_data: "", expected_output: "" }]);
      setTestCaseIdx(customCases.length); // jump to new case
    }
  };

  return (
    <div className="rounded-md w-full bg-gray-50 shadow-md">
      {/* HEADER */}
      <header
        className="flex flex-col bg-white sticky top-0 z-10 items-stretch justify-between"
        style={{ borderRadius: "12px 12px 0px 0px" }}
      >
        <div className="flex justify-between bg-[#333] text-white text-[18px] items-center py-2 px-5 rounded-t-md">
          <h1 className="font-semibold">Output Window</h1>
          <button className="w-6 h-6">
            <img className="invert" src={cancelIcon} alt="Cancel" />
          </button>
        </div>
        <div className="flex justify-start w-full gap-1 border-b border-gray-300 items-center text-sm font-medium">
          <button
            className={`px-5 py-2 transition-all ${
              active === "cout"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActive("cout")}
          >
            Compilation Result
          </button>
          <button
            className={`px-5 py-2 transition-all ${
              active === "cin"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => setActive("cin")}
          >
            Custom Input
          </button>
        </div>
      </header>

      {/* COMPILATION RESULT */}
      {active === "cout" ? (
        !compileResult ? (
          <Loader />
        ) : (
          <>
            {/* CASE SELECTOR */}
            <div className="flex gap-3 px-6 py-3 border-b bg-white">
              {compileResult.map((res, key) => (
                <button
                  key={key}
                  onClick={() => setTestCaseIdx(key)}
                  className={`px-3 py-1 rounded-md text-sm transition ${
                    testCaseIdx === key
                      ? "bg-blue-500 text-white shadow"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  Case {key + 1}
                </button>
              ))}
            </div>

            {/* TEST CASE DISPLAY WITH ANIMATION */}
            <div className="relative overflow-hidden h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testCaseIdx}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 p-6 flex flex-col gap-4 bg-white"
                >
                  {compileResult[testCaseIdx]?.status && (
                    <div className="flex justify-between items-center">
                      <span
                        className={`px-3 py-1 rounded-md font-medium ${
                          compileResult[testCaseIdx].status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {compileResult[testCaseIdx].status}
                      </span>
                      <span className="bg-gray-200 px-3 py-1 rounded-md text-sm">
                        {compileResult[testCaseIdx]?.time_taken} sec
                      </span>
                    </div>
                  )}

                  <div>
                    <label className="font-semibold text-gray-700">Input:</label>
                    <textarea
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                      value={compileResult[testCaseIdx]?.input_data}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">
                      Expected Output:
                    </label>
                    <textarea
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                      value={compileResult[testCaseIdx]?.expected_output}
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700">
                      Code Output:
                    </label>
                    <textarea
                      readOnly
                      className="w-full p-2 border rounded-md bg-gray-50"
                      value={compileResult[testCaseIdx]?.actual_output || ""}
                    />
                  </div>

                  {compileResult[testCaseIdx]?.stderr && (
                    <details className="bg-red-50 border border-red-200 p-3 rounded-md text-sm">
                      <summary className="cursor-pointer font-medium text-red-600">
                        Error Log
                      </summary>
                      <pre className="text-xs text-red-700 whitespace-pre-wrap mt-2">
                        {compileResult[testCaseIdx]?.stderr}
                      </pre>
                    </details>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )
      ) : (
        <>
          {/* CUSTOM INPUT SECTION */}
          <div className="flex gap-3 px-6 py-3 border-b bg-white items-center">
            {customCases.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setTestCaseIdx(idx)}
                className={`px-3 py-1 rounded-md text-sm transition ${
                  testCaseIdx === idx
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                Case {idx + 1}
              </button>
            ))}
            {customCases.length < 10 && (
              <button
                onClick={addCustomCase}
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>

          {/* CUSTOM CASES CAROUSEL */}
          <div className="relative overflow-hidden h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={testCaseIdx}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 flex flex-col gap-4 bg-white"
              >
                <div>
                  <label className="font-semibold text-gray-700">Input:</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={customCases[testCaseIdx].input}
                    onChange={(e) => {
                      const newCases = [...customCases];
                      newCases[testCaseIdx].input = e.target.value;
                      setCustomCases(newCases);
                    }}
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700">
                    Expected Output:
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    value={customCases[testCaseIdx].expected}
                    onChange={(e) => {
                      const newCases = [...customCases];
                      newCases[testCaseIdx].expected = e.target.value;
                      setCustomCases(newCases);
                    }}
                  />
                </div>

                <div className="flex gap-3 mt-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
                    Run
                  </button>
                  <button className="px-4 py-2 border border-green-500 text-green-600 rounded-md shadow hover:bg-green-50">
                    Compare Output
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

export default Submission;

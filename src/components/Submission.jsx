import React, { useState } from "react";
import { cancelIcon } from "../data/imageData";

const inputSchema = [];

function Submission() {
  const [active, setActive] = useState("cout");
  const [customInput, setCustomInput] = useState("");
  return (
    <div className="rounded-md w-full">
      <header
        className="flex flex-col bg-white sticky top-0 z-10 items-stretch justify-between"
        style={{ borderRadius: "12px 12px 0px 0px" }}
      >
        <div className="flex justify-between bg-[#757575] text-white text-[18px] items-center py-2 px-5">
          <h1>Output Window</h1>
          <button className="w-6 h-6">
            <img className="invert" src={cancelIcon} alt="Cancel" />
          </button>
        </div>
        <div className="flex justify-start w-full gap-1 border-b-2 border-gray-400 items-center">
          <button
            className={`px-5 py-2 transition-all duration-100 ${
              active === "cout" &&
              "border-b-2 border-blue-500 text-blue-500 font-semibold"
            } `}
            onClick={() => setActive("cout")}
          >
            Compilation Result
          </button>
          <button
            className={`px-5 py-2 transition-all duration-100 ${
              active === "cin" &&
              "border-b-2 border-blue-500 text-blue-500 font-semibold"
            } `}
            onClick={() => setActive("cin")}
          >
            Custom Input
          </button>
        </div>
      </header>
      {active === "cout" ? (
        <>
          <section className="m-6 flex flex-col gap-3 items-start border-b-2 pb-2 border-gray-400">
            <span className="bg-gray-200 p-2 px-3 rounded-md">Case 1</span>
          </section>
          <section className="m-6 flex flex-col gap-3 p-6 rounded-md shadow-md items-start border-2 border-gray-100">
            <div className="flex flex-col items-stretch w-full gap-2">
              <label className="font-semibold">Input:</label>
              <textarea
                readOnly={true}
                className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
              >
                1 2 3 5 6 8 9 6 3
              </textarea>
            </div>
            <div className="flex flex-col items-stretch w-full gap-2">
              <label className="font-semibold">Expected Output:</label>
              <textarea
                readOnly={true}
                className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
              >
                1 2 3 5 6 8 9 6 3
              </textarea>
            </div>
            <div className="flex flex-col items-stretch w-full gap-2">
              <label className="font-semibold">Code Output:</label>
              <textarea
                readOnly={true}
                className="box-border focus:outline-0 p-2 block border-1 border-gray-200 rounded-sm"
              >
                1 2 3 5 6 8 9 6 3
              </textarea>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="m-6 flex flex-col gap-3 items-start border-b-2 pb-2 border-gray-400">
            <span className="bg-gray-200 p-2 px-3 rounded-md">Case 1</span>
          </section>
          <section className="m-6 flex flex-col gap-3 p-6 rounded-md shadow-md items-start border-2 border-gray-100">
            <div className="flex flex-col items-stretch w-full gap-2">
              <label className="font-semibold">Input:</label>
              <textarea
                className="box-border p-2 block border-1 border-gray-200 rounded-sm"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-start items-center w-full gap-2 my-2">
              <button className="p-2 border-2 bg-white font-semibold shadow-md border-green-400 px-3 text-green-400 rounded-md">
                Code Output
              </button>
              <button className="p-2 border-2 bg-green-400 text-white font-semibold shadow-md border-green-400 px-3 rounded-md">
                Expected Output
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Submission;

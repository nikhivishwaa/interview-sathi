import React, { useState } from "react";
import Loader from "./Loader";
import Submission from "./Submission";

function ProblemWindow() {
  const [active, setActive] = useState("pxs");

  return (
    <section className="h-full">
      <div className="flex justify-start gap-4 w-full bg-gray-100 p-2">
        <button
          className={`px-3 border-b-2 border-gray-100 ${
            active === "ps" && "border-green-500"
          } `}
          onClick={() => setActive("ps")}
        >
          Problem Stetment
        </button>
        <button
          className={`px-3 border-b-2 border-gray-100 ${
            active !== "ps" && "border-green-500"
          } `}
          onClick={() => setActive("submission")}
        >
          {" "}
          Submission
        </button>
      </div>
      {active === "ps" ? (
        <div className="m-auto relative w-full min-h-9/12">
          <Loader />
        </div>
      ) : (
        <Submission />
      )}
    </section>
  );
}

export default ProblemWindow;

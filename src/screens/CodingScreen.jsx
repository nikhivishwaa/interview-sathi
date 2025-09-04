import React, { useEffect } from "react";
import ProblemWindow from "../components/ProblemWindow";
import CodeEditor from "../components/CodeEditor";
import AnalyticsTracker from "../components/AnalyticsTracker";


function CodingScreen() {
  useEffect(() => {
    window.document.title = "Coding Assessment";
  });
  return (
    <main className="w-full grid grid-cols-2 gap-1 h-full">
      <AnalyticsTracker screenName="CodingScreen"/>
      <ProblemWindow />
      <CodeEditor />
    </main>
  );
}

export default CodingScreen;

import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { lanuages } from "../data/editorDefaults";
import { lightModeSvg, darkModeSvg } from "../data/imageData";
import logger from "../utils/logger";
import { useCoding } from "../context/CodingContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Loader2 as Spinner } from "lucide-react";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [submitting, setSubmitting] = useState(0);
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);
  const {
    problemTab,
    setProblemTab,
    code,
    problem,
    setCode,
    setCompileResult,
    setSubmissionResult,
  } = useCoding();
  const { apiUrl, getAuthHeader } = useAuth();
  const { id } = useParams();

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const compileAndRun = async () => {
    const compileConfig = {
      code: editorRef.current.getValue(),
      language: `${lanuages[language]?.id}`,
    };

    try {
      if (code === compileConfig.code) return;
      setSubmitting(1);
      const response = await axios.post(
        `${apiUrl}/coding/ps/${id}/run/`,
        compileConfig,
        getAuthHeader()
      );
      if (response.status === 200) {
        const { results } = response.data;
        logger({ results });

        // if (route?.state?.lazyload) {
        //   sendAnalytics("coding_problem_opened", {
        //     ps_id: id,
        //     title: data?.title,
        //   });
        // }
        const completeResult = results.map((value, index) => {
          let x = problem.testcases[index] || {};
          x = { ...x, ...value };
          return x;
        });
        setCompileResult(completeResult);
        setCode(compileConfig.code);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      if (error?.response?.status === 404)
        toast.error("This Coding Problem Not Exist");
      else toast.error("Failed to load Problem Statement");
    } finally {
      setSubmitting(0);
      setProblemTab("submission");
    }
    logger({ problem });
  };
  const submitSolution = async () => {
    const compileConfig = {
      code: editorRef.current.getValue(),
      language: `${lanuages[language]?.id}`,
    };

    try {
      if (code === compileConfig.code) return;
      setSubmitting(2);
      const response = await axios.post(
        `${apiUrl}/coding/ps/${id}/submit/`,
        compileConfig,
        getAuthHeader()
      );
      if (response.status === 200) {
        const { results } = response.data;
        logger({ results });

        // if (route?.state?.lazyload) {
        //   sendAnalytics("coding_problem_opened", {
        //     ps_id: id,
        //     title: data?.title,
        //   });
        // }
        const completeResult = results.map((value, index) => {
          let x = problem.testcases[index] || {};
          x = { ...x, ...value };
          return x;
        });
        setCompileResult(completeResult);
        setCode(compileConfig.code);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      if (error?.response?.status === 404)
        toast.error("This Coding Problem Not Exist");
      else toast.error("Failed to load Problem Statement");
    } finally {
      setSubmitting(0);
      setProblemTab("submission");
    }
    logger({ problem });
  };

  const file = lanuages[language];

  return (
    <section className="h-full">
      <div className="flex justify-between bg-gray-100 p-2">
        <span className="flex items-center gap-3">
          <label htmlFor="language">Language: </label>
          <select
            name="lanuage"
            className="border-1 border-gray-300 rounded-md p-[2px] px-[6px]"
            id="language"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          >
            {Object.keys(lanuages).map((value, key) => (
              <option value={value} key={key}>
                {value}
              </option>
            ))}
          </select>
        </span>
        <button
          className="inline-block w-5 h-5"
          onClick={() => setTheme((t) => (t === "light" ? "vs-dark" : "light"))}
        >
          {theme === "vs-dark" ? (
            <img src={lightModeSvg} alt="lightmode" />
          ) : (
            <img src={darkModeSvg} alt="darkmode" />
          )}
        </button>
      </div>
      <Editor
        theme={theme}
        path={file.name}
        defaultLanguage={file.language}
        defaultValue={file.value}
        height="calc(100vh - 163.8px)"
        options={{
          contextmenu: false,
        }}
        line={2}
        onMount={handleEditorDidMount}
      />
      <div className="flex justify-end gap-3 bg-gray-100 p-2 pb-4 pr-6">
        <button
          onClick={() => compileAndRun(editorRef.current.getValue())}
          className="py-1 px-2 flex gap-2 items-center shadow-md rounded-md text-white bg-[#1f883d] font-[600] text-[14px]"
        >
          {submitting == 1 ? (
            <>
              <Spinner className="animate-spin w-4 h-4" /> Compiling
            </>
          ) : (
            "Compile & Run"
          )}
        </button>
        <button
          onClick={() => submitSolution()}
          className="py-1 px-2 flex gap-2 items-center shadow-md rounded-md text-white bg-[#1f883d] font-[600] text-[14px]"
        >
          {submitting == 2 ? (
            <>
              <Spinner className="animate-spin w-4 h-4" /> Submitting
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </section>
  );
}

export default CodeEditor;

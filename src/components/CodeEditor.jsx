import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { lanuages } from "../data/editorDefaults";
import { lightModeSvg, darkModeSvg } from "../data/imageData";
import logger from "../utils/logger";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const compileAndRun = (code) => {
    const output = eval(code);
    logger({ output });
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
        height="calc(100vh - 99.8px)"
        options={{
          contextmenu: false,
        }}
        line={2}
        onMount={handleEditorDidMount}
      />
      <div className="flex justify-end gap-3 bg-gray-100 p-2 pb-4 pr-6">
        <button
          onClick={() => compileAndRun(editorRef.current.getValue())}
          className="py-1 px-2 shadow-md rounded-md text-white bg-[#1f883d] font-[600] text-[14px]"
        >
          Compile & Run
        </button>
        <button
          onClick={() => logger(editorRef.current.getValue())}
          className="py-1 px-2 shadow-md rounded-md text-white bg-[#1f883d] font-[600] text-[14px]"
        >
          Submit
        </button>
      </div>
    </section>
  );
}

export default CodeEditor;

import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import logger from "../utils/logger";

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "Product Manager",
  "UI/UX Designer",
  "DevOps Engineer",
  "Mobile App Developer",
];

const resumes = [
  "John_Doe_Resume.pdf",
  "Jane_Fullstack.pdf",
  "Arjun_DataScience.pdf",
  "Priya_UIUX.pdf",
  "Michael_Backend.pdf",
];

const AutocompleteSearch = ({
  placeholder,
  data = [],
  filter = (item, query) => item.search(new RegExp(query, "gmi")) > -1,
  setResult = (x) => {
    logger({ x });
  },
  element = null,
}) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (query.trim() === "") setFiltered([]);
    else {
      // const filteredData = data.filter((item) => filter(item, query));
      const filteredData = data.filter((item) => item.search(new RegExp(query, "gmi")) > -1);
      setFiltered((x) => filteredData);
      logger({ query });
    }
  }, [query, data]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      set(filtered[activeIndex]);
      setFiltered([]);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      <input
        type="text"
        className="w-full border rounded-xl px-4 py-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <AnimatePresence>
        {filtered.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute bg-white border w-full mt-1 rounded-xl shadow-lg z-10"
          >
            {filtered.map((item, index) =>
              element ? (
                // <element data={item} key={index} />
                element
              ) : (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer rounded-lg hover:bg-blue-100 ${
                    index === activeIndex ? "bg-blue-200" : ""
                  }`}
                  onMouseDown={() => setQuery(index)}
                >
                  {item}
                  
                </li>
              )
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutocompleteSearch;

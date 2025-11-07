import React, { useState } from "react";
import Loader from "./Loader";
import Submission from "./Submission";
import ProblemStatement from "./ProblemStatement";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { sendAnalytics } from "../utils/firebase";
import logger from "../utils/logger";
import { useCoding } from "../context/CodingContext";

function ProblemWindow() {
  const [content, setContent] = useState("");
  const { id } = useParams();
  const route = useLocation();
  const { problemTab, setProblemTab, problem, setProblem } = useCoding();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { getAuthHeader, apiUrl } = useAuth();

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiUrl}/coding/ps/${id}/`,
          getAuthHeader()
        );
        if (response.status === 200) {
          logger({ data: response.data });
          const { data } = response.data;

          if (route?.state?.lazyload) {
            sendAnalytics("coding_problem_opened", {
              ps_id: id,
              title: data?.title,
            });
          }
          setProblem(data);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
        if (error?.response?.status === 404)
          toast.error("This Coding Problem Not Exist");
        else toast.error("Failed to load Problem Statement");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const compileAndRun = async () => {
    try {
      setSubmitting(true);
      const response = await axios.get(
        `${apiUrl}:8000/execute/testcases`,
        getAuthHeader()
      );
      if (response.status === 200) {
        logger({ data: response.data });
        const { data } = response.data;

        // if (route?.state?.lazyload) {
        //   sendAnalytics("coding_problem_opened", {
        //     ps_id: id,
        //     title: data?.title,
        //   });
        // }
        setProblem(result);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      if (error?.response?.status === 404)
        toast.error("This Coding Problem Not Exist");
      else toast.error("Failed to load Problem Statement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = () => {
    console.log("Editor JSON:", content);
  };

  return (
    <section style={{height:"calc(100vh - 64px)"}} className="overflow-y-auto">
      <div className="flex justify-start gap-4 w-full bg-gray-100 p-2 sticky top-0 z-10">
        <button
          className={`px-3 border-b-2 border-gray-100 ${
            problemTab === "ps" && "border-green-500"
          } `}
          onClick={() => setProblemTab("ps")}
        >
          Problem Stetment
        </button>
        <button
          className={`px-3 border-b-2 border-gray-100 ${
            problemTab !== "ps" && "border-green-500"
          } `}
          onClick={() => setProblemTab("submission")}
        >
          {" "}
          Submission
        </button>
      </div>
      <div className="m-auto relative w-full min-h-9/12">
        {loading ? (
          <Loader />
        ) : (
          <>
            {problemTab === "ps" ? (
              <ProblemStatement problem={problem} />
            ) : (
              <Submission problem={problem} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProblemWindow;

import { submitQuiz } from "./api/quiz";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SubmitQuiz({ quizId, answers }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!Object.keys(answers).length) {
      alert("Please attempt at least one question.");
      return;
    }
    setLoading(true);
    try {
      const formatted = Object.keys(answers).map((qId) => ({
        question: qId,
        option: answers[qId],
      }));
      const res = await submitQuiz(quizId, formatted);
      alert(`🎉 Your Score: ${res.score} / ${res.total}`);
      navigate("/quizzes");
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className={`w-full md:w-auto px-6 py-3 rounded font-semibold transition-all duration-200
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
    >
      {loading ? "Submitting..." : "Submit Quiz"}
    </button>
  );
}

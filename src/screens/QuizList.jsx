import React, { useEffect, useState } from "react";
import { getQuizzesByCategory } from "./api/quiz";

export default function QuizList({ categoryId, onSelectQuiz }) {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (categoryId) {
      getQuizzesByCategory(categoryId)
        .then(setQuizzes)
        .catch(console.error);
    }
  }, [categoryId]);

  return (
    <div className="grid gap-4">
      {quizzes.length === 0 && (
        <p className="text-gray-500">No quizzes available for this category.</p>
      )}
      {quizzes.map((q) => (
        <div
          key={q.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg hover:bg-indigo-50 transition duration-300"
          onClick={() => onSelectQuiz(q)}
        >
          <h3 className="font-semibold text-lg text-indigo-700">{q.title}</h3>
          <p className="text-gray-600">{q.description}</p>
          <div className="mt-2 text-sm text-gray-500 flex justify-between">
            <span>Duration: {q.duration_minutes} mins</span>
            <span>{q.questions_count || 5} Questions</span>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { getQuizDetail } from "./api/quiz";
import QuizQuestion from "./QuizQuestion";
import SubmitQuiz from "./SubmitQuiz";

export default function QuizDetail({ quizId }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({}); // { questionId: { selected, correct } }
  const [score, setScore] = useState(null);

  useEffect(() => {
    getQuizDetail(quizId)
      .then(setQuiz)
      .catch(console.error);
  }, [quizId]);

  const handleAnswer = (questionId, optionId, isCorrect) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { selected: optionId, correct: isCorrect },
    }));
  };

  const handleSubmit = () => {
    const totalScore = Object.values(answers).reduce(
      (sum, q) => sum + (q.correct ? 1 : 0),
      0
    );
    setScore(totalScore);
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="flex flex-col space-y-6">
      <div className="sticky top-0 bg-white z-10 p-4 shadow-sm border-b">
        <h2 className="text-2xl font-bold text-indigo-700">{quiz.title}</h2>
        <p className="text-gray-500">{quiz.description}</p>
      </div>

      <div className="space-y-6 p-4">
        {quiz.questions.map((q) => (
          <QuizQuestion
            key={q.id}
            question={q}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-white z-10 p-4 border-t flex flex-col md:flex-row justify-between items-center gap-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Submit Quiz
        </button>

        {score !== null && (
          <p className="text-lg font-bold text-green-700">
            Your Score: {score} / {quiz.questions.length}
          </p>
        )}
      </div>
    </div>
  );
}

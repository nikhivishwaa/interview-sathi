// QuizPage.jsx
import React, { useState } from "react";
import QuizCategoryList from "./QuizCategoryList";
import QuizList from "./QuizList";
import QuizDetail from "./QuizDetail";

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="hidden md:block md:w-1/4 h-screen sticky top-6 mx-4 bg-white shadow-xl rounded-lg overflow-y-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-600 text-center">
          Categories
        </h2>
        <QuizCategoryList
          onSelectCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </aside>

      {/* Right Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {!selectedCategory && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 text-lg">
              Select a category to start learning!
            </p>
          </div>
        )}

        {selectedCategory && !selectedQuiz && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              {selectedCategory.name} Quizzes
            </h2>
            <div className="space-y-4">
              <QuizList
                categoryId={selectedCategory.id}
                onSelectQuiz={setSelectedQuiz}
              />
            </div>
          </div>
        )}

        {selectedQuiz && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <QuizDetail quizId={selectedQuiz.id} />
            <button
              onClick={() => setSelectedQuiz(null)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Back to Quizzes
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// QuizCategoryList.jsx
import React, { useEffect, useState } from "react";
import { getCategories } from "./api/quiz";

export default function QuizCategoryList({ onSelectCategory, selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((cat) => (
        <div
          key={cat.id}
          onClick={() => onSelectCategory(cat)}
          className={`flex items-center justify-center cursor-pointer p-2 rounded-md border 
            transition-all duration-300
            ${selectedCategory?.id === cat.id
              ? "bg-indigo-500 text-white border-indigo-600 shadow-lg"
              : "bg-white hover:bg-indigo-100 border-gray-200 hover:text-indigo-700"}`
          }
        >
          {/* Optional: Checkbox indicator */}
          <input
            type="checkbox"
            readOnly
            checked={selectedCategory?.id === cat.id}
            className="mr-2 accent-indigo-500 cursor-pointer"
          />
          <span className="text-sm font-medium">{cat.name}</span>
        </div>
      ))}
    </div>
  );
}

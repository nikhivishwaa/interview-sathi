import { useState } from "react";

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (option) => {
    if (!answered) {
      setSelected(option.id);
      setAnswered(true);

      // Pass result to parent
      if (onAnswer) {
        onAnswer(question.id, option.id, option.is_correct);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4 border border-gray-200">
      <p className="font-semibold text-lg mb-4">{question.text}</p>
      <div className="grid grid-cols-2 gap-4">
        {question.options.map((o) => {
          const isSelected = selected === o.id;

          // Styling logic
          let optionStyle =
            "flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all";

          if (answered) {
            if (o.is_correct) {
              optionStyle +=
                " bg-green-100 border-green-500 text-green-700 font-bold";
            } else if (isSelected && !o.is_correct) {
              optionStyle +=
                " bg-red-100 border-red-500 text-red-700 font-bold";
            } else {
              optionStyle += " bg-gray-50";
            }
          } else {
            optionStyle += " hover:bg-gray-100";
          }

          return (
            <label key={o.id} className={optionStyle}>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={o.id}
                disabled={answered}
                checked={isSelected}
                onChange={() => handleSelect(o)}
                className="accent-indigo-600 w-5 h-5"
              />
              <span>{o.text}</span>
            </label>
          );
        })}
      </div>

      {answered && (
        <div className="mt-4 p-3 border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700 rounded">
          <p className="text-sm">{question.description_right_options_answer}</p>
        </div>
      )}
    </div>
  );
}

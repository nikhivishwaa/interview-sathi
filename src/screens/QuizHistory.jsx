// import React, { useEffect, useState } from "react";
// // import { getQuizHistory } from "./api/quiz";

// export default function QuizHistory() {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     getQuizHistory().then(setHistory).catch(console.error);
//   }, []);

//   return (
//     <div className="mt-6">
//       <h2 className="font-bold mb-2">Past Attempts</h2>
//       <ul className="space-y-1">
//         {history.map((h) => (
//           <li key={h.id}>
//             {h.quiz.title} - Score: {h.score} - Date: {new Date(h.completed_at).toLocaleString()}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

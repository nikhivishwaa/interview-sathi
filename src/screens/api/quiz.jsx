import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API = import.meta.env.VITE_BACKEND;
console.log(secureLocalStorage.getItem("token"),'ankushgupta')

// Get all categories
export const getCategories = async () => {
  const token = secureLocalStorage.getItem("token");
  const res = await axios.get(`${API}/quize/categories/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

// Get quizzes by category
export const getQuizzesByCategory = async (categoryId) => {
  const token = secureLocalStorage.getItem("token");
  const res = await axios.get(`${API}/quize/categories/${categoryId}/quizzes/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

// Get quiz detail
export const getQuizDetail = async (quizId) => {
  const token = secureLocalStorage.getItem("token");
  const res = await axios.get(`${API}/quize/${quizId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

// Submit quiz answers
export const submitQuiz = async (quizId, answers) => {
  const token = secureLocalStorage.getItem("token");
  const res = await axios.post(
    `${API}/quize/${quizId}/submit/`,
    { answers },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

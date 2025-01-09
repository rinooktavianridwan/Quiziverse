// hooks/useAuth.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, loginUser } from "./localHelper";

export function useAuth() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    try {
      const user = loginUser(email, password);
      setError(null);
      const event = new Event("userUpdate");
      window.dispatchEvent(event);
      navigate("/");
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignup = (username, email, password) => {
    try {
      addUser({ username, email, password, bestScore: 0 });
      setError(null);
      alert("Signup successful! Please login.");
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const validateUser = () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
    }
  };

  const checkOngoingQuiz = () => {
    const loggedInUserItem = localStorage.getItem("loggedInUser");
    const loggedInUser = loggedInUserItem ? JSON.parse(loggedInUserItem) : null;

    if (loggedInUser?.quizState) {
      const continueQuiz = window.confirm(
        "You have an ongoing quiz. Do you want to continue?"
      );
      if (continueQuiz) {
        navigate(`/quiz/${loggedInUser.quizState.questionIndex}`, {
          state: {
            quizData: loggedInUser.quizState.quizData,
            category: loggedInUser.quizState.category,
            difficulty: loggedInUser.quizState.difficulty,
            totalTime: loggedInUser.quizState.timeLeft,
          },
        });
      }
    }
  };

  return { handleLogin, handleSignup, validateUser, checkOngoingQuiz, error };
}

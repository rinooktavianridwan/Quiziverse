import { useState } from "react";
import axios from "axios";

export function useFetchQuiz() {
  const [error, setError] = useState(null);

  const fetchQuizData = async (category = "9", difficulty = "easy") => {
    const url = `https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`;
    try {
      const response = await axios.get(url);
      return response.data.results;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const checkOngoingQuiz = (navigate) => {
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

  return { fetchQuizData, checkOngoingQuiz, error };
}

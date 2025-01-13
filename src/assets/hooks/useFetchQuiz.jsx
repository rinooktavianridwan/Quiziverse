import { useState } from "react";
import axios from "axios";
import { deleteQuizState } from "../../assets/hooks/localHelper";

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

  const continueQuiz = (navigate, quizState) => {
    navigate(`/quiz/${quizState.questionIndex}`, {
      state: {
        quizData: quizState.quizData,
        category: quizState.category,
        difficulty: quizState.difficulty,
        totalTime: quizState.timeLeft,
      },
    });
  };

  const resetQuiz = (userEmail) => {
    deleteQuizState(userEmail);
  };

  return { fetchQuizData, continueQuiz, resetQuiz, error };
}

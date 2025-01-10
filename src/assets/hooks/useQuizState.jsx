import { useEffect } from "react";
import { updateQuizState } from "./localHelper";

export const useQuizState = (quizData, questionIndex, loggedInUser, timeLeft, category, difficulty) => {
  useEffect(() => {
    if (loggedInUser) {
      updateQuizState(loggedInUser.email, {
        questionIndex,
        timeLeft,
        category,
        difficulty,
        quizData,
      });
    }
  }, [questionIndex, timeLeft, quizData, loggedInUser, category, difficulty]);

  const selectAnswer = (answer) => {
    quizData[questionIndex].selectedAnswer = answer;
  };

  return { selectAnswer };
};

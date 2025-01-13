import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateBestScore, updateQuizState } from "../../hooks/localHelper";
import { quizChoose } from "../../data/QuizCategory";
import "./QuizDetail.css";
import { useQuizTimer } from "../../hooks/useQuizTimer";
import { useQuizState } from "../../hooks/useQuizState";
import BQuizresume from "../background/quizresume/BQuizresume";

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const quizData = state?.quizData || [];
  const category = state?.category || "9";
  const difficulty = state?.difficulty || "easy";
  const totalTime = state?.totalTime || 300;
  const questionIndex = id ? parseInt(id, 10) : 0;

  const categoryMap = quizChoose.reduce((map, item) => {
    map[item.value] = item.category;
    return map;
  }, {});

  if (
    !quizData.length ||
    isNaN(questionIndex) ||
    questionIndex >= quizData.length
  ) {
    return <p>Invalid question</p>;
  }

  const question = quizData[questionIndex];
  const handleTimeOut = () => handleSubmit();
  const timeLeft = useQuizTimer(questionIndex, totalTime, handleTimeOut);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  const loggedInUserItem = localStorage.getItem("loggedInUser");
  const loggedInUser = loggedInUserItem ? JSON.parse(loggedInUserItem) : null;

  const { selectAnswer } = useQuizState(
    quizData,
    questionIndex,
    loggedInUser,
    timeLeft,
    category,
    difficulty
  );

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);

    setSelectedAnswer(quizData[questionIndex].selectedAnswer || null);
  }, [questionIndex, quizData]);

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
    selectAnswer(answer);
  };

  const handleNext = () => {
    if (questionIndex + 1 < quizData.length) {
      navigate(`/quiz/${questionIndex + 1}`, {
        state: { quizData, totalTime: timeLeft, category, difficulty },
      });
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const category = categoryMap[state.category];
    const difficulty = state.difficulty;
    const correctAnswers = quizData.filter(
      (q) => q.correct_answer === q.selectedAnswer
    ).length;
    const totalQuestions = quizData.length;
    const answeredQuestions = quizData.filter((q) =>
      q.hasOwnProperty("selectedAnswer")
    ).length;
    console.log(quizData);
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      if (loggedInUser) {
        await updateBestScore(loggedInUser.email, score, category, difficulty);
        await updateQuizState(loggedInUser.email, null);
      }
    }

    localStorage.removeItem("timeLeft");
    navigate("/resume", {
      state: {
        quizData,
        totalTime: timeLeft,
        score,
        category,
        difficulty,
        answeredQuestions,
      },
    });
  };

  return (
    <>
      <div className="detail-container">
        <BQuizresume />
        <div className="timer">Time Left: {formatTime(timeLeft)}</div>
        <div className="detail-question-container">
          <div className="detail-question">
            <p dangerouslySetInnerHTML={{ __html: question.question }} />
          </div>
          {answers.map((answer, index) => (
            <div
              key={index}
              className={`detail-answer ${
                selectedAnswer === answer ? "selected" : ""
              }`}
              onClick={() => handleSelect(answer)}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ))}
          <div className="detail-confirm">
            <button onClick={handleNext}>
              {questionIndex + 1 === quizData.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizDetail;

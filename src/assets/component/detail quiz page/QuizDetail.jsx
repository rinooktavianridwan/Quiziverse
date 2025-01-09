import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { updateBestScore, updateQuizState } from "../../hooks/localHelper";
import { quizChoose } from "../../data/QuizCategory";
import "./QuizDetail.css";

function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const quizData = state?.quizData || [];
  const category = state?.category || "9";
  const difficulty = state?.difficulty || "easy";
  const totalTime = state?.totalTime || 300;
  const questionIndex = id ? parseInt(id, 10) : 0;
  const storedTimeLeft =
    JSON.parse(localStorage.getItem("timeLeft") || "{}")[questionIndex] ||
    totalTime;
  const [timeLeft, setTimeLeft] = useState(storedTimeLeft);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
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

  useEffect(() => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);

    setSelectedAnswer(quizData[questionIndex].selectedAnswer || null);
  }, [questionIndex, quizData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // Waktu habis, kirim langsung ke Resume
        }
        const newTimeLeft = prev - 1;
        saveTimeToLocalStorage(newTimeLeft); // Simpan waktu ke localStorage
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex]);

  useEffect(() => {
    const loggedInUserItem = localStorage.getItem("loggedInUser");
    const loggedInUser = loggedInUserItem ? JSON.parse(loggedInUserItem) : null;
    if (loggedInUser) {
      updateQuizState(loggedInUser.email, {
        questionIndex,
        timeLeft,
        category,
        difficulty,
        quizData,
        selectedAnswers: quizData.map((q) => q.selectedAnswer || null),
      });
    }
  }, [questionIndex, timeLeft, quizData]);

  const saveTimeToLocalStorage = (newTimeLeft) => {
    const storedTimes = JSON.parse(localStorage.getItem("timeLeft") || "{}");
    storedTimes[questionIndex] = newTimeLeft;
    localStorage.setItem("timeLeft", JSON.stringify(storedTimes));
  };

  const handleSelect = (answer) => {
    setSelectedAnswer(answer);
    quizData[questionIndex].selectedAnswer = answer;
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
  console.log("Category:", categoryMap[state.category]);
  console.log("Difficulty:", state.difficulty);
  const handleSubmit = () => {
    const category = categoryMap[state.category];
    const difficulty = state.difficulty;
    const correctAnswers = quizData.filter(
      (q) => q.correct_answer === q.selectedAnswer
    ).length;
    const totalQuestions = quizData.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      if (loggedInUser) {
        // Pastikan kategori dan kesulitan disediakan
        updateBestScore(loggedInUser.email, score, category, difficulty);
        updateQuizState(loggedInUser.email, null);
      }
    }

    localStorage.removeItem("timeLeft");
    navigate("/resume", {
      state: { quizData, totalTime: timeLeft, score, category, difficulty },
    });
  };

  return (
    <div className="detail-container">
      <div className="timer">Time Left: {timeLeft}s</div>
      <div className="detail-question">
        <p dangerouslySetInnerHTML={{ __html: question.question }} />
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
  );
}

export default QuizDetail;

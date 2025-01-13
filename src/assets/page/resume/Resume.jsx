import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Resume.css";
import BQuizresume from "../../component/background/quizresume/BQuizresume";

function Resume() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quizData = state?.quizData || [];
  const totalTime = state?.totalTime || 0;
  const score = state?.score || 0;

  const [showPopup, setShowPopup] = useState(false);
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const bestScore = loggedInUser.bestScore;
  console.log("Best Score:", bestScore);
  const categoryBestScore = bestScore[state.category];
  console.log("Category Best Score:", categoryBestScore);

  const difficultyBestScore = categoryBestScore[state.difficulty];

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const totalQuestions = quizData.length;
  const correctAnswers = quizData.filter(
    (q) => q.selectedAnswer === q.correct_answer
  ).length;

  return (
    <>
      <div className="resume-container">
        <BQuizresume />
        <div className="resume-quiz">
          <div className="title">
            <p>Resume Quiz</p>
          </div>
          <div className="resume-detail-category">
            <p>{state?.category || "General Knowledge"}</p>
            <p>{state?.difficulty || "easy"}</p>
          </div>
          <div className="resume-detail">
            <p>number of questions :</p>
            <p>{totalQuestions}</p>
          </div>
          <div className="resume-detail">
            <p>questions answered :</p>
            <p>{state?.answeredQuestions || "0"}</p>
          </div>
          <div className="resume-detail">
            <p>Correct Answers :</p>
            <p>
              {correctAnswers}/{totalQuestions}
            </p>
          </div>
          <div className="resume-detail">
            <p>Time Required:</p>
            <p>{formatTime(300 - totalTime)}</p>
          </div>
          <p>Your Score: {score}%</p>
          <p>Your Best Score: {difficultyBestScore}%</p>
          <div className="resume-detail">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/quiz")}>Play Again</button>
          </div>

          {/* Button Dropdown */}
          <button onClick={() => setShowPopup(true)}>Show Quiz</button>
          {/* Popup */}
          {showPopup && (
            <div className="popup-overlay">
              <div className="popup">
                <div
                  className="close-button"
                  onClick={() => setShowPopup(false)}
                >
                  ✖
                </div>
                <div className="popup-title">
                  <h2>Quiz Details</h2>
                </div>
                <div className="popup-content">
                  {quizData.map((q, index) => (
                    <div key={index} className="quiz-item">
                      <p>
                        <strong>Q{index + 1}:</strong>{" "}
                        <span
                          dangerouslySetInnerHTML={{ __html: q.question }}
                        />
                      </p>
                      <p>
                        Your Answer:{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: q.selectedAnswer || "No Answer",
                          }}
                        />
                      </p>
                      <p>
                        Correct Answer:{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: q.correct_answer,
                          }}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Resume;

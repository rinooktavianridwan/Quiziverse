import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Resume.css";

function Resume() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const quizData = state?.quizData || [];
  const totalTime = state?.totalTime || 0;
  const score = state?.score || 0;

  console.log("Category:", state?.category);
  console.log("Difficulty:", state?.difficulty);

  const [showDetails, setShowDetails] = useState(false);
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const bestScore = loggedInUser.bestScore;
  console.log("Best Score:", bestScore);
  const categoryBestScore = bestScore[state.category] ;
  console.log("Category Best Score:", categoryBestScore);

  const difficultyBestScore = categoryBestScore[state.difficulty];

  const totalQuestions = quizData.length;
  const correctAnswers = quizData.filter(
    (q) => q.selectedAnswer === q.correct_answer
  ).length;

  return (
    <div className="resume-container">
      <div className="resume-quiz">
        <p>Resume Quiz</p>
        <div className="resume-detail">
          <p>Total Questions:</p>
          <p>{totalQuestions}</p>
        </div>
        <div className="resume-detail">
          <p>Correct Answers:</p>
          <p>
            {correctAnswers}/{totalQuestions}
          </p>
        </div>
        <div className="resume-detail">
          <p>Total Time Taken:</p>
          <p>{300 - totalTime} seconds</p>
        </div>
        <p>Your Score: {score}%</p>
        <p>Your Best Score: {difficultyBestScore}%</p>
        <div className="resume-detail">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/quiz")}>Play Again</button>
        </div>

        {/* Button Dropdown */}
        <div className="resume-detail">
          <button onClick={() => setShowDetails(!showDetails)}>
            Resume Quiz {showDetails ? "▲" : "▼"}
          </button>
          {showDetails && (
            <div className="quiz-details">
              {quizData.map((q, index) => (
                <div key={index} className="quiz-item">
                  <p>
                    <strong>Q{index + 1}:</strong>{" "}
                    <span dangerouslySetInnerHTML={{ __html: q.question }} />
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Resume;

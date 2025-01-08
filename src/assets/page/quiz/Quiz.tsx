import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";
import { quizChoose } from "../../data/QuizCategory";

function Quiz() {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const loggedInUserItem = localStorage.getItem("loggedInUser");
    const loggedInUser = loggedInUserItem ? JSON.parse(loggedInUserItem) : null;

    if (loggedInUser) {
      const quizState = loggedInUser.quizState;
      if (quizState) {
        // Tampilkan popup melanjutkan atau memulai baru
        const continueQuiz = window.confirm(
          "You have an ongoing quiz. Do you want to continue?"
        );
        if (continueQuiz) {
          navigate(`/quiz/${quizState.questionIndex}`, {
            state: {
              quizData: quizState.quizData,
              category: quizState.category,
              difficulty: quizState.difficulty,
              totalTime: quizState.timeLeft,
            },
          });
        }
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUrl = `https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`;
    setLoading(true);
    try {
      const response = await axios.get(updatedUrl);
      setQuizData(response.data.results);
      setLoading(false);
      console.log("Category:", category);
      console.log("Difficulty:", difficulty);
      navigate(`/quiz/0`, {
        state: {
          quizData: response.data.results,
          category: category,
          difficulty: difficulty,
        },
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="quiz-container">
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      <h1>Quiziverse</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {quizChoose.map((item) => (
              <option key={item.value} value={item.value}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit">Start Quiz</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Quiz;

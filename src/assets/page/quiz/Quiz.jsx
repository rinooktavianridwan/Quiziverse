import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import { quizChoose } from "../../data/QuizCategory";
import { useAuth } from "../../hooks/useAuth";
import { useFetchQuiz } from "../../hooks/useFetchQuiz";

function Quiz() {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { validateUser } = useAuth();
  const { fetchQuizData, checkOngoingQuiz, error } = useFetchQuiz();

  useEffect(() => {
    validateUser();
    checkOngoingQuiz(navigate);
  }, [validateUser, checkOngoingQuiz, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const quizData = await fetchQuizData(category, difficulty);
      setLoading(false);
      navigate(`/quiz/0`, {
        state: { quizData, category, difficulty },
      });
    } catch (err) {
      console.error(err.message);
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

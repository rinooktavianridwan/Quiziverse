import { useState } from "react";
import axios from "axios";

export function useFetchQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuizData = async (category, difficulty) => {
    const url = `https://opentdb.com/api.php?amount=10&type=multiple&category=${category}&difficulty=${difficulty}`;
    setLoading(true);
    try {
      const response = await axios.get(url);
      setLoading(false);
      return response.data.results;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { fetchQuizData, loading, error };
}

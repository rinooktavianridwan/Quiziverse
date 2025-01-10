import { useState, useEffect } from "react";

export const useQuizTimer = (questionIndex, totalTime, handleTimeOut) => {
  const getStoredTimeLeft = (index, defaultTime) => {
    const storedTimes = JSON.parse(localStorage.getItem("timeLeft") || "{}");
    return storedTimes[index] || defaultTime;
  };

  const saveTimeLeft = (index, timeLeft) => {
    const storedTimes = JSON.parse(localStorage.getItem("timeLeft") || "{}");
    storedTimes[index] = timeLeft;
    localStorage.setItem("timeLeft", JSON.stringify(storedTimes));
  };

  const [timeLeft, setTimeLeft] = useState(getStoredTimeLeft(questionIndex, totalTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        const newTimeLeft = prev - 1;
        saveTimeLeft(questionIndex, newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questionIndex]);

  return timeLeft;
};

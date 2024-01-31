import { useEffect, useState } from "react";

function useTimer(initialTime, interval, onTimerEnd) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let intervalId;

    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            setTimerRunning(false);
            onTimerEnd(); // Callback function for timer end
            return 0;
          }
          return prevTime - 1;
        });
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, interval, onTimerEnd]);

  const resetTimer = () => {
    setTimeRemaining(initialTime);
    setTimerRunning(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    timeRemaining,
    timerRunning,
    resetTimer,
    formatTime,
  };
}

export default useTimer;

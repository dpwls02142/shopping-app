"use client";

import { useState, useEffect } from "react";

const useDealTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      const totalSecondsInDay = 24 * 60 * 60;
      const secondsPassed =
        now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

      const remainingSeconds = totalSecondsInDay - secondsPassed;

      if (remainingSeconds > 0) {
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        setTimeLeft({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });

        setProgress((secondsPassed / totalSecondsInDay) * 100);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, progress };
};

export default useDealTimer;

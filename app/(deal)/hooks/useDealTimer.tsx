"use client";
import { useEffect,useState } from "react";

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const TOTAL_SECONDS_IN_DAY =
  HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;
const TIMER_INTERVAL_MS = 1000;
const PERCENTAGE_MULTIPLIER = 100;
const TIME_PADDING_LENGTH = 2;
const PADDING_CHAR = "0";

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
      const secondsPassed =
        now.getHours() * SECONDS_PER_HOUR +
        now.getMinutes() * SECONDS_PER_MINUTE +
        now.getSeconds();
      const remainingSeconds = TOTAL_SECONDS_IN_DAY - secondsPassed;

      if (remainingSeconds > 0) {
        const hours = Math.floor(remainingSeconds / SECONDS_PER_HOUR);
        const minutes = Math.floor(
          (remainingSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
        );
        const seconds = remainingSeconds % SECONDS_PER_MINUTE;

        setTimeLeft({
          hours: String(hours).padStart(TIME_PADDING_LENGTH, PADDING_CHAR),
          minutes: String(minutes).padStart(TIME_PADDING_LENGTH, PADDING_CHAR),
          seconds: String(seconds).padStart(TIME_PADDING_LENGTH, PADDING_CHAR),
        });

        setProgress(
          (secondsPassed / TOTAL_SECONDS_IN_DAY) * PERCENTAGE_MULTIPLIER
        );
      }
    }, TIMER_INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, progress };
};

export default useDealTimer;

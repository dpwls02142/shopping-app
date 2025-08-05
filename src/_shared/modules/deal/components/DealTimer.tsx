"use client";
import { useEffect } from "react";

import { useDealTimerStore } from "@/_shared/modules/deal/stores/useDealTimerStore";

function DealTimer() {
  const { timeLeft, progress, startTimer, stopTimer } = useDealTimerStore();

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  return (
    <div className="mt-4 flex items-center p-4 rounded-lg bg-gray-100">
      <span className="text-xl font-bold text-red-500 whitespace-nowrap">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds} 남음
      </span>
      <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
        <div
          className="bg-red-500 h-2.5 rounded-full"
          style={{ width: `${100 - progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export { DealTimer };

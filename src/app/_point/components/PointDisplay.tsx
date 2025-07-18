"use client";

import usePointTimerStore from "@/app/_point/stores/usePointTimerStore";

import { SCROLL_INACTIVITY_THRESHOLD_MS, TOTAL_SCROLL_TIME_FOR_POINTS_MS } from "@/lib/constants/point";

function PointDisplay() {
  const { scrollTimeElapsed } = usePointTimerStore();

  const remainingTime = Math.max(0, TOTAL_SCROLL_TIME_FOR_POINTS_MS - scrollTimeElapsed);
  const minutes = Math.floor(remainingTime / TOTAL_SCROLL_TIME_FOR_POINTS_MS);
  const seconds = Math.floor((remainingTime % TOTAL_SCROLL_TIME_FOR_POINTS_MS) / SCROLL_INACTIVITY_THRESHOLD_MS);

  const displayTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed left-1/2 transform -translate-x-1/2 top-[14px] bg-white text-blue-400 border border-gray-200 p-1 rounded-3xl z-50">
      <p className="text-xs font-bold">{displayTime}</p>
    </div>
  );
}

export default PointDisplay;

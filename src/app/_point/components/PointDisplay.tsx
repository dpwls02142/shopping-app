"use client";

import { useEffect, useState } from "react";

import { POINT_DISPLAY } from "@/lib/styles";

import usePointTimerStore from "@/app/_point/stores/usePointTimerStore";

import { TOTAL_SCROLL_TIME_FOR_POINTS_MS } from "@/lib/constants/point";

function PointDisplay() {
  const {
    scrollTimeElapsed,
    pauseScrollTimer,
    lastPointsAdded,
    clearLastPointsAdded,
  } = usePointTimerStore();
  const [showPointMessage, setShowPointMessage] = useState(false);

  useEffect(() => {
    if (lastPointsAdded > 0) {
      pauseScrollTimer();
      setShowPointMessage(true);
      const timeout = setTimeout(() => {
        setShowPointMessage(false);
        clearLastPointsAdded();
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [lastPointsAdded, clearLastPointsAdded, pauseScrollTimer]);

  const clampedRemaining = Math.max(
    TOTAL_SCROLL_TIME_FOR_POINTS_MS - scrollTimeElapsed,
    0
  );
  const totalRemainingSeconds = Math.floor(clampedRemaining / 1000);
  const minutes = Math.floor(totalRemainingSeconds / 60);
  const seconds = totalRemainingSeconds % 60;

  const displayTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className={POINT_DISPLAY}>
      <p className="text-xs font-bold">
        {showPointMessage ? `${lastPointsAdded}포인트 적립` : displayTime}
      </p>
    </div>
  );
}

export default PointDisplay;

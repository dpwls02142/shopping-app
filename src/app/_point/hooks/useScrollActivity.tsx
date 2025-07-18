import { RefObject, useCallback, useEffect, useRef } from "react";

import usePointTimerStore from "@/app/_point/stores/usePointTimerStore";

import {
  MIN_SCROLL_DELTA,
  POINTS_PER_INTERVAL,
  SCROLL_INACTIVITY_THRESHOLD_MS,
  SCROLL_POINT_GAIN_INTERVAL_MS,
  TOTAL_SCROLL_TIME_FOR_POINTS_MS,
} from "@/lib/constants/point";

export function useScrollActivity(
  mainRef: RefObject<HTMLElement | null>,
  isEnabled: boolean = true
) {
  const {
    isScrolling,
    scrollTimeElapsed,
    incrementScrollTime,
    resetScrollTimer,
    addPoints,
    startScrollTimer,
    pauseScrollTimer,
  } = usePointTimerStore();

  const inactivityTimeoutIdRef = useRef<number | undefined>(undefined);
  const lastScrollPositionRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (!isEnabled) return;

    const mainElement = mainRef.current;
    if (!mainElement) return;

    const currentScrollPosition = mainElement.scrollTop;
    const scrollDelta = Math.abs(
      currentScrollPosition - lastScrollPositionRef.current
    );

    if (scrollDelta > MIN_SCROLL_DELTA) {
      lastScrollPositionRef.current = currentScrollPosition;
      if (inactivityTimeoutIdRef.current) {
        window.clearTimeout(inactivityTimeoutIdRef.current);
      }
      startScrollTimer();
      inactivityTimeoutIdRef.current = window.setTimeout(() => {
        pauseScrollTimer();
      }, SCROLL_INACTIVITY_THRESHOLD_MS);
    }
  }, [mainRef, startScrollTimer, pauseScrollTimer, isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;
    const mainElement = mainRef.current;
    if (mainElement) {
      lastScrollPositionRef.current = mainElement.scrollTop;
      mainElement.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        mainElement.removeEventListener("scroll", handleScroll);
        if (inactivityTimeoutIdRef.current) {
          window.clearTimeout(inactivityTimeoutIdRef.current);
        }
      };
    }
  }, [mainRef, handleScroll, isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;
    let scrollIncrementInterval: number | undefined;
    if (isScrolling) {
      scrollIncrementInterval = window.setInterval(() => {
        incrementScrollTime(SCROLL_POINT_GAIN_INTERVAL_MS);
      }, SCROLL_POINT_GAIN_INTERVAL_MS);
    }

    return () => {
      if (scrollIncrementInterval) {
        window.clearInterval(scrollIncrementInterval);
      }
    };
  }, [isScrolling, incrementScrollTime, isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;
    if (scrollTimeElapsed >= TOTAL_SCROLL_TIME_FOR_POINTS_MS) {
      addPoints(POINTS_PER_INTERVAL);
      resetScrollTimer();
    }
  }, [scrollTimeElapsed, addPoints, resetScrollTimer, isEnabled]);
}

import { RefObject, useEffect, useRef } from "react";
import { throttle } from "lodash";
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

  const inactivityTimeout = useRef<number | undefined>(undefined);
  const lastScrollPosition = useRef<number>(0);

  // 스크롤 이벤트 핸들러
  const throttledScrollHandler = useRef(
    throttle(() => {
      if (!isEnabled || !mainRef.current) return;

      const currentScrollPosition = mainRef.current.scrollTop;
      const delta = Math.abs(
        currentScrollPosition - lastScrollPosition.current
      );

      if (delta > MIN_SCROLL_DELTA) {
        lastScrollPosition.current = currentScrollPosition;

        clearTimeout(inactivityTimeout.current);
        startScrollTimer();

        inactivityTimeout.current = window.setTimeout(
          pauseScrollTimer,
          SCROLL_INACTIVITY_THRESHOLD_MS
        );
      }
    }, 100)
  );

  // 스크롤 이벤트 등록
  useEffect(() => {
    if (!isEnabled || !mainRef.current) return;

    const el = mainRef.current;
    lastScrollPosition.current = el.scrollTop;
    el.addEventListener("scroll", throttledScrollHandler.current, {
      passive: true,
    });

    return () => {
      el.removeEventListener("scroll", throttledScrollHandler.current!);
      clearTimeout(inactivityTimeout.current);
    };
  }, [isEnabled, mainRef]);

  // 타이머로 시간 누적
  useEffect(() => {
    if (!isEnabled || !isScrolling) return;

    const intervalId = window.setInterval(() => {
      incrementScrollTime(SCROLL_POINT_GAIN_INTERVAL_MS);
    }, SCROLL_POINT_GAIN_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isEnabled, isScrolling, incrementScrollTime]);

  // 포인트 지급
  useEffect(() => {
    if (!isEnabled || scrollTimeElapsed < TOTAL_SCROLL_TIME_FOR_POINTS_MS) {
      return;
    } else {
      addPoints(POINTS_PER_INTERVAL);
      resetScrollTimer();
    }
  }, [isEnabled, scrollTimeElapsed, addPoints, resetScrollTimer]);
}

import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";
import { throttle } from "lodash";

import usePointTimerStore from "@/_shared/modules/point/stores/usePointTimerStore";

import {
  MIN_SCROLL_DELTA,
  POINTS_PER_INTERVAL,
  SCROLL_INACTIVITY_THRESHOLD_MS,
  SCROLL_POINT_GAIN_INTERVAL_MS,
  SCROLL_THROTTLE_INTERVAL_MS,
  TOTAL_SCROLL_TIME_FOR_POINTS_MS,
} from "@/lib/constants/point";

interface UseScrollActivityProps {
  mainRef: RefObject<HTMLElement | null>;
  isEnabled?: boolean;
}

/**
 * 스크롤 감지 훅 (스크롤 시간 누적 및 포인트 지급)
 * @param mainRef - 스크롤 메인 요소 참조
 * @param isEnabled - 스크롤 감지 훅 활성화 여부 (기본값: true)
 * cart(장바구니) 도메인에서는 스크롤 감지 훅 비활성화
 */
function useScrollActivity({
  mainRef,
  isEnabled = true,
}: UseScrollActivityProps) {
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

  /**
   * 스크롤 이벤트 핸들러
   */
  const scrollHandler = useCallback(() => {
    if (!isEnabled || !mainRef.current) return;

    const currentScrollPosition = mainRef.current.scrollTop;
    const delta = Math.abs(currentScrollPosition - lastScrollPosition.current);

    if (delta > MIN_SCROLL_DELTA) {
      lastScrollPosition.current = currentScrollPosition;
      clearTimeout(inactivityTimeout.current);
      startScrollTimer();
      inactivityTimeout.current = window.setTimeout(
        pauseScrollTimer,
        SCROLL_INACTIVITY_THRESHOLD_MS
      );
    }
  }, [isEnabled, mainRef, pauseScrollTimer, startScrollTimer]);

  /**
   * 스크롤 이벤트 핸들러를 throttle 처리
   */
  const throttledScrollHandler = useMemo(
    () => throttle(scrollHandler, SCROLL_THROTTLE_INTERVAL_MS),
    [scrollHandler]
  );

  /**
   * 스크롤 이벤트 등록
   */
  useEffect(() => {
    if (!isEnabled || !mainRef.current) return;

    const el = mainRef.current;
    lastScrollPosition.current = el.scrollTop;

    el.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    return () => {
      el.removeEventListener("scroll", throttledScrollHandler);
      throttledScrollHandler.cancel(); // 대기 중인 throttle 취소
      clearTimeout(inactivityTimeout.current);
    };
  }, [isEnabled, mainRef, throttledScrollHandler]);

  /**
   * 타이머로 시간 누적
   */
  useEffect(() => {
    if (!isEnabled || !isScrolling) return;

    const intervalId = window.setInterval(() => {
      incrementScrollTime(SCROLL_POINT_GAIN_INTERVAL_MS);
    }, SCROLL_POINT_GAIN_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isEnabled, isScrolling, incrementScrollTime]);

  /**
   * 포인트 지급
   */
  useEffect(() => {
    if (!isEnabled || scrollTimeElapsed < TOTAL_SCROLL_TIME_FOR_POINTS_MS) {
      return;
    } else {
      addPoints(POINTS_PER_INTERVAL);
      resetScrollTimer();
    }
  }, [isEnabled, scrollTimeElapsed, addPoints, resetScrollTimer]);
}

export { useScrollActivity };

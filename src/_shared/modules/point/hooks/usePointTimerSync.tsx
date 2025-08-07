"use client";

import { useEffect } from "react";

import { usePointTimerStore } from "@/_shared/modules/point/stores/usePointTimerStore";

/**
 * 탭 간 포인트 타이머 상태 동기화를 위한 훅
 */
function usePointTimerSync() {
  const { syncStateFromStorage } = usePointTimerStore();

  useEffect(() => {
    syncStateFromStorage();

    const handleFocus = () => {
      syncStateFromStorage();
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncStateFromStorage();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncStateFromStorage]);
}

export { usePointTimerSync };

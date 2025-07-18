import { create } from "zustand";

type PointTimerState = {
  scrollTimeElapsed: number;
  isScrolling: boolean;
  points: number;
  lastScrollActivity: number;
  lastPointsAdded: number;
};

interface PointTimerActions {
  startScrollTimer: () => void;
  pauseScrollTimer: () => void;
  incrementScrollTime: (time: number) => void;
  resetScrollTimer: () => void;
  addPoints: (amount: number) => void;
  clearLastPointsAdded: () => void;
}

const usePointTimerStore = create<PointTimerState & PointTimerActions>(
  (set, _get) => ({
    scrollTimeElapsed: 0,
    isScrolling: false,
    points: 0,
    lastScrollActivity: 0,
    lastPointsAdded: 0,

    startScrollTimer: () => {
      set({ isScrolling: true, lastScrollActivity: Date.now() });
    },
    pauseScrollTimer: () => {
      set({ isScrolling: false });
    },
    incrementScrollTime: (time: number) => {
      set((state) => ({
        scrollTimeElapsed: state.scrollTimeElapsed + time,
      }));
    },
    resetScrollTimer: () => {
      set({ scrollTimeElapsed: 0, lastScrollActivity: Date.now() });
    },
    addPoints: (amount: number) => {
      set((state) => ({
        points: state.points + amount,
        lastPointsAdded: amount,
      }));
    },
    clearLastPointsAdded: () => {
      set({ lastPointsAdded: 0 });
    },
  })
);

export default usePointTimerStore;

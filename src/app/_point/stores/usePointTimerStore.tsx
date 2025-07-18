import { create } from "zustand";

type PointTimerState = {
  scrollTimeElapsed: number;
  isScrolling: boolean;
  points: number;
  lastScrollActivity: number;
}

interface PointTimerActions {
  startScrollTimer: () => void;
  pauseScrollTimer: () => void;
  incrementScrollTime: (time: number) => void;
  resetScrollTimer: () => void;
  addPoints: (amount: number) => void;
}

const usePointTimerStore = create<PointTimerState & PointTimerActions>(
  (set, get) => ({
    scrollTimeElapsed: 0,
    isScrolling: false,
    points: 0,
    lastScrollActivity: 0,

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
      }));
    },
  })
);

export default usePointTimerStore;

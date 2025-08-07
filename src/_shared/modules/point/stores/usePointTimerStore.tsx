import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

type PointTimerState = {
  scrollTimeElapsed: number;
  isScrolling: boolean;
  points: number;
  lastScrollActivity: number;
  lastPointsAdded: number;
  sessionStartTime: number;
  scrollStartTime: number | null;
  accumulatedScrollTime: number;
};

type PointTimerActions = {
  startScrollTimer: () => void;
  pauseScrollTimer: () => void;
  updateScrollTime: () => void;
  resetScrollTimer: () => void;
  addPoints: (amount: number) => void;
  clearLastPointsAdded: () => void;
  syncStateFromStorage: () => void;
};

const POINT_TIMER_STORAGE_KEY = "point-timer-store";
const POINT_TIMER_CHANNEL = "point-timer-sync";
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== "undefined") {
  broadcastChannel = new BroadcastChannel(POINT_TIMER_CHANNEL);
}

const usePointTimerStore = create<PointTimerState & PointTimerActions>()(
  subscribeWithSelector(
    persist(
      (set, _get) => ({
        scrollTimeElapsed: 0,
        isScrolling: false,
        points: 0,
        lastScrollActivity: 0,
        lastPointsAdded: 0,
        sessionStartTime: Date.now(),
        scrollStartTime: null,
        accumulatedScrollTime: 0,

        syncStateFromStorage: () => {
          // localStorage에서 최신 상태를 가져와서 동기화
          const storedState = localStorage.getItem(POINT_TIMER_STORAGE_KEY);
          if (storedState) {
            try {
              const parsedState = JSON.parse(storedState);
              if (parsedState?.state) {
                set(parsedState.state);
              }
            } catch (error) {
              console.error("Failed to sync state from storage:", error);
            }
          }
        },

        startScrollTimer: () => {
          set((state) => {
            const currentTime = Date.now();
            const newState = {
              isScrolling: true,
              lastScrollActivity: currentTime,
              scrollStartTime: state.scrollStartTime || currentTime, // 처음 시작할 때만 설정
            };

            // 다른 탭에 상태 변경 알림
            if (broadcastChannel) {
              broadcastChannel.postMessage({
                type: "STATE_UPDATE",
                payload: newState,
              });
            }

            return newState;
          });
        },

        pauseScrollTimer: () => {
          set((state) => {
            const currentTime = Date.now();
            let newAccumulatedTime = state.accumulatedScrollTime;

            // 스크롤 중이었다면 현재까지의 시간을 누적에 추가
            if (state.isScrolling && state.scrollStartTime) {
              const sessionTime = currentTime - state.scrollStartTime;
              newAccumulatedTime = state.accumulatedScrollTime + sessionTime;
            }

            const newState = {
              isScrolling: false,
              scrollStartTime: null,
              accumulatedScrollTime: newAccumulatedTime,
            };

            if (broadcastChannel) {
              broadcastChannel.postMessage({
                type: "STATE_UPDATE",
                payload: newState,
              });
            }

            return newState;
          });
        },

        updateScrollTime: () => {
          set((state) => {
            if (!state.isScrolling || !state.scrollStartTime) {
              return state;
            }

            const currentTime = Date.now();
            const currentSessionTime = currentTime - state.scrollStartTime;
            const totalElapsed =
              state.accumulatedScrollTime + currentSessionTime;

            const newState = {
              scrollTimeElapsed: totalElapsed,
            };

            if (broadcastChannel) {
              broadcastChannel.postMessage({
                type: "STATE_UPDATE",
                payload: newState,
              });
            }

            return newState;
          });
        },

        resetScrollTimer: () => {
          const newState = {
            scrollTimeElapsed: 0,
            accumulatedScrollTime: 0,
            scrollStartTime: null,
            lastScrollActivity: Date.now(),
          };
          set(newState);

          if (broadcastChannel) {
            broadcastChannel.postMessage({
              type: "STATE_UPDATE",
              payload: newState,
            });
          }
        },

        addPoints: (amount: number) => {
          set((state) => {
            const newState = {
              points: state.points + amount,
              lastPointsAdded: amount,
            };

            if (broadcastChannel) {
              broadcastChannel.postMessage({
                type: "STATE_UPDATE",
                payload: newState,
              });
            }

            return newState;
          });
        },

        clearLastPointsAdded: () => {
          const newState = { lastPointsAdded: 0 };
          set(newState);

          if (broadcastChannel) {
            broadcastChannel.postMessage({
              type: "STATE_UPDATE",
              payload: newState,
            });
          }
        },
      }),
      {
        name: POINT_TIMER_STORAGE_KEY,
        storage: {
          getItem: (name) => {
            const str = localStorage.getItem(name);
            if (!str) return null;
            return JSON.parse(str);
          },
          setItem: (name, value) => {
            localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name) => localStorage.removeItem(name),
        },
      }
    )
  )
);

if (broadcastChannel) {
  broadcastChannel.addEventListener("message", (event) => {
    const { type, payload } = event.data;

    if (type === "STATE_UPDATE" && payload) {
      usePointTimerStore.setState((state) => ({
        ...state,
        ...payload,
      }));
    }
  });
}

export { usePointTimerStore };

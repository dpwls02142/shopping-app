import { create } from "zustand";

const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const TOTAL_SECONDS_IN_DAY =
  HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE;

type Time = {
  hours: string;
  minutes: string;
  seconds: string;
};

type DealTimerStore = {
  timeLeft: Time;
  progress: number;
  isActive: boolean;
  startTimer: () => void;
  stopTimer: () => void;
};

let timerInterval: NodeJS.Timeout | null = null;

const useDealTimerStore = create<DealTimerStore>((set, get) => ({
  timeLeft: { hours: "00", minutes: "00", seconds: "00" },
  progress: 0,
  isActive: false,

  startTimer: () => {
    const { isActive } = get();

    if (isActive) return;

    const updateTime = () => {
      const now = new Date();
      const secondsPassed =
        now.getHours() * SECONDS_PER_HOUR +
        now.getMinutes() * SECONDS_PER_MINUTE +
        now.getSeconds();
      const remainingSeconds = TOTAL_SECONDS_IN_DAY - secondsPassed;

      const hours = Math.floor(remainingSeconds / SECONDS_PER_HOUR);
      const minutes = Math.floor(
        (remainingSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE
      );
      const seconds = remainingSeconds % SECONDS_PER_MINUTE;

      set({
        timeLeft: {
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        },
        progress: (secondsPassed / TOTAL_SECONDS_IN_DAY) * 100,
      });
    };

    updateTime();
    timerInterval = setInterval(updateTime, 1000);
    set({ isActive: true });
  },

  stopTimer: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    set({ isActive: false });
  },
}));

export { useDealTimerStore };

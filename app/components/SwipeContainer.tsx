"use client";

import { motion, PanInfo } from "framer-motion";
import { ReactNode } from "react";
import { useAppNavigation } from "@/app/hooks/useAppNavigation";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

export default function SwipeContainer({ children }: SwipeContainerProps) {
  const { currentPage, navigateTo } = useAppNavigation();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      if (currentPage === "deal") {
        navigateTo("home");
      }
    } else if (offset.x < -SWIPE_THRESHOLD) {
      if (currentPage === "home") {
        navigateTo("deal");
      }
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

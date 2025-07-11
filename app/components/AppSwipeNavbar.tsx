"use client";

import { motion, PanInfo } from "framer-motion";
import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { ReactNode } from "react";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

const AppSwipeNavbar = ({ children }: SwipeContainerProps) => {
  const { currentPage, navigateToWithUrl } = useAppNavigation();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      if (currentPage === "deal") {
        navigateToWithUrl("home");
      }
    } else if (offset.x < -SWIPE_THRESHOLD) {
      if (currentPage === "home") {
        navigateToWithUrl("deal");
      }
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="h-full cursor-grab active:cursor-grabbing"
    >
      {children}
    </motion.div>
  );
};

export default AppSwipeNavbar;

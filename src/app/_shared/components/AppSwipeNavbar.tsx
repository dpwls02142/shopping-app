"use client";

import { ReactNode } from "react";
import { motion, PanInfo } from "framer-motion";

import { SWIPE_CONTAINER } from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

function AppSwipeNavbar({ children }: SwipeContainerProps) {
  const { currentPage, navigateToWithUrl } = useAppNavigation();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
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
      className={SWIPE_CONTAINER}
    >
      {children}
    </motion.div>
  );
}

export default AppSwipeNavbar;

"use client";

import { motion, PanInfo } from "framer-motion";
import { ReactNode } from "react";
import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { useRouter } from "next/navigation";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

function AppSwipeNavbar({ children }: SwipeContainerProps) {
  const { currentPage, navigateTo } = useAppNavigation();
  const router = useRouter();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      if (currentPage === "deal") {
        navigateTo("home");
        router.push("/?tab=home");
      }
    } else if (offset.x < -SWIPE_THRESHOLD) {
      if (currentPage === "home") {
        navigateTo("deal");
        router.push("/?tab=deal");
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

export default AppSwipeNavbar;
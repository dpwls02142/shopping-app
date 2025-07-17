"use client";

import { ReactNode } from "react";
import { motion, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";

import { SWIPE_CONTAINER } from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

function AppSwipeNavbar({ children }: SwipeContainerProps) {
  const { currentPage } = useAppNavigation();
  const router = useRouter();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const { offset } = info;

    if (offset.x > SWIPE_THRESHOLD) {
      if (currentPage === "deal") {
        router.push("/");
      }
    } else if (offset.x < -SWIPE_THRESHOLD) {
      if (currentPage === "home") {
        router.push("/?tab=deal");
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

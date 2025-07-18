"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { motion, PanInfo } from "framer-motion";

import { SWIPE_CONTAINER } from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

interface SwipeContainerProps {
  children: ReactNode;
}

const SWIPE_THRESHOLD = 50;

function AppSwipeNavbar({ children }: SwipeContainerProps) {
  const { currentPage, mainNavItems } = useAppNavigation();
  const router = useRouter();

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset } = info;

    const currentPageIndex = mainNavItems.findIndex(
      (item) => item.id === currentPage
    );

    if (currentPageIndex === -1) return;

    if (offset.x > SWIPE_THRESHOLD) {
      if (currentPageIndex > 0) {
        const previousPage = mainNavItems[currentPageIndex - 1];
        router.push(previousPage.href);
      }
    } else if (offset.x < -SWIPE_THRESHOLD) {
      if (currentPageIndex < mainNavItems.length - 1) {
        const nextPage = mainNavItems[currentPageIndex + 1];
        router.push(nextPage.href);
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

"use client";

import { ReactNode } from "react";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

import { AppSwipeNavbar } from "@/app/_shared/components/AppSwipeNavbar";

interface MainViewProps {
  shoppingHome: ReactNode;
  deal: ReactNode;
}

function MainView({ shoppingHome, deal }: MainViewProps) {
  const { currentPage } = useAppNavigation();

  return (
    <AppSwipeNavbar>
      {currentPage === "home" && shoppingHome}
      {currentPage === "deal" && deal}
    </AppSwipeNavbar>
  );
}

export default MainView;

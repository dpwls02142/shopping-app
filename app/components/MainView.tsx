"use client";

import { ReactNode } from "react";

import AppSwipeNavbar from "@/app/components/AppSwipeNavbar";
import { useAppNavigation } from "@/app/hooks/useAppNavigation";

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

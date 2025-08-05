"use client";

import { ReactNode } from "react";

import { useAppNavigation } from "@/_shared/hooks/useAppNavigation";

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";

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

export { MainView };

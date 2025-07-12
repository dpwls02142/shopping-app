"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import AppSwipeNavbar from "@/app/components/AppSwipeNavbar";
import { ReactNode } from "react";
interface MainViewProps {
  shoppingHome: ReactNode;
  deal: ReactNode;
}

const MainView = ({ shoppingHome, deal }: MainViewProps) => {
  const { currentPage } = useAppNavigation();

  return (
    <AppSwipeNavbar>
      {currentPage === "home" && shoppingHome}
      {currentPage === "deal" && deal}
    </AppSwipeNavbar>
  );
};

export default MainView;

"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import AppSwipeNavbar from "@/app/components/AppSwipeNavbar";

interface MainViewProps {
  shoppingHome: React.ReactNode;
  deal: React.ReactNode;
}

const MainView = ({ shoppingHome, deal }: MainViewProps) => {
  const { currentPage } = useAppNavigation();

  return (
    <AppSwipeNavbar>
      {currentPage === "home" && shoppingHome}
      {currentPage === "deal" && deal}
    </AppSwipeNavbar>
  );
}

export default MainView;
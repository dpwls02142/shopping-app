"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import SwipeContainer from "@/app/components/SwipeContainer";

interface MainViewProps {
  shoppingHome: React.ReactNode;
  deal: React.ReactNode;
}

export default function MainView({ shoppingHome, deal }: MainViewProps) {
  const { currentPage } = useAppNavigation();

  return (
    <SwipeContainer>
      {currentPage === "home" && shoppingHome}
      {currentPage === "deal" && deal}
    </SwipeContainer>
  );
}

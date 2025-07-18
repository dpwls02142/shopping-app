"use client";

import { ReactNode, useRef } from "react";

import { MAIN_CONTAINER } from "@/lib/styles";
import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";
import AppHeader from "@/app/_shared/components/AppHeader";
import AppNavbar from "@/app/_shared/components/AppNavbar";
import PointDisplay from "@/app/_point/components/PointDisplay";
import { useScrollActivity } from "@/app/_point/hooks/useScrollActivity";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { isMainPage, currentPage } = useAppNavigation();
  const mainRef = useRef<HTMLElement>(null);
  const isCartPage = currentPage === "cart";

  useScrollActivity(mainRef, !isCartPage);

  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      {isMainPage && <AppNavbar />}
      {!isCartPage && <PointDisplay />}
      <main ref={mainRef} className={MAIN_CONTAINER}>
        {children}
      </main>
    </div>
  );
}

export default ConditionalLayout;

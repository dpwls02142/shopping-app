"use client";

import { ReactNode, useRef } from "react";

import { MAIN_CONTAINER } from "@/lib/styles";

import { useScrollActivity } from "@/_shared/modules/point/hooks/useScrollActivity";
import { useAppNavigation } from "@/_shared/hooks/useAppNavigation";

import { PointDisplay } from "@/_shared/modules/point/components/PointDisplay";
import { AppHeader } from "@/_shared/components/AppHeader";
import { AppNavbar } from "@/_shared/components/AppNavbar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { isMainPage, currentPage } = useAppNavigation();
  const mainRef = useRef<HTMLElement>(null);
  const isCartPage = currentPage === "cart";

  useScrollActivity({ mainRef, isEnabled: !isCartPage });

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

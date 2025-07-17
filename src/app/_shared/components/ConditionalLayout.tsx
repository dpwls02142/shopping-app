"use client";

import { ReactNode } from "react";

import { FLEX_LAYOUT, MAIN_CONTAINER } from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

import AppHeader from "@/app/_shared/components/AppHeader";
import AppNavbar from "@/app/_shared/components/AppNavbar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { currentPage } = useAppNavigation();
  const showNavbar = currentPage === "home" || currentPage === "deal";
  return (
    <div className={FLEX_LAYOUT}>
      <AppHeader />
      {showNavbar && <AppNavbar />}
      <main className={MAIN_CONTAINER}>{children}</main>
    </div>
  );
}

export default ConditionalLayout;

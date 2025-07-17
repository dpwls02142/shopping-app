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
  const { isMainPage } = useAppNavigation();
  return (
    <div className={FLEX_LAYOUT}>
      <AppHeader />
      {isMainPage && <AppNavbar />}
      <main className={MAIN_CONTAINER}>{children}</main>
    </div>
  );
}

export default ConditionalLayout;

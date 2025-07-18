"use client";

import { ReactNode } from "react";

import { MAIN_CONTAINER } from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

import AppHeader from "@/app/_shared/components/AppHeader";
import AppNavbar from "@/app/_shared/components/AppNavbar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const { isMainPage } = useAppNavigation();
  return (
    <div className="h-full flex flex-col">
      <AppHeader />
      {isMainPage && <AppNavbar />}
      <main className={MAIN_CONTAINER}>{children}</main>
    </div>
  );
}

export default ConditionalLayout;

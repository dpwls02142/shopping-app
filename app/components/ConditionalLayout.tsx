"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppNavbar from "./AppNavbar";
import BackButton from "./BackButton";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const { showHeader, showNavbar, showBackButton } = useAppNavigation();

  return (
    <div className="h-full flex flex-col">
      {showHeader && <AppHeader />}
      {showNavbar && <AppNavbar />}
      {showBackButton && <BackButton />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

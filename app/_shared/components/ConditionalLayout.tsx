"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  useInitializeFromUrl,
  useShowBackButton,
  useShowHeader,
  useShowNavbar,
} from "@/app/_shared/hooks/useAppNavigation";

import AppHeader from "@/app/_shared/components/AppHeader";
import BackButton from "@/app/_shared/components/BackButton";
import AppNavbar from "@/app/(main)/components/AppNavbar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const showHeader = useShowHeader();
  const showNavbar = useShowNavbar();
  const showBackButton = useShowBackButton();
  const initializeFromUrl = useInitializeFromUrl();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeFromUrl(pathname, searchParams);
  }, [pathname, searchParams, initializeFromUrl]);

  return (
    <div className="h-full flex flex-col">
      {showHeader && <AppHeader />}
      {showNavbar && <AppNavbar />}
      {showBackButton && <BackButton />}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

export default ConditionalLayout;

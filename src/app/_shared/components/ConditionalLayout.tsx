"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { FLEX_LAYOUT, MAIN_CONTAINER } from "@/lib/styles";

import {
  useInitializeFromUrl,
  useShowNavbar,
} from "@/app/_shared/hooks/useAppNavigation";

import AppHeader from "@/app/_shared/components/AppHeader";
import AppNavbar from "@/app/_shared/components/AppNavbar";

interface ConditionalLayoutProps {
  children: ReactNode;
}

function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const showNavbar = useShowNavbar();
  const initializeFromUrl = useInitializeFromUrl();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeFromUrl(pathname, searchParams);
  }, [pathname, searchParams, initializeFromUrl]);

  return (
    <div className={FLEX_LAYOUT}>
      <AppHeader />
      {showNavbar && <AppNavbar />}
      <main className={MAIN_CONTAINER}>{children}</main>
    </div>
  );
}

export default ConditionalLayout;

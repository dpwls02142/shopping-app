"use client";

import {
  useShowHeader,
  useShowNavbar,
  useShowBackButton,
  useInitializeFromUrl,
} from "@/app/hooks/useAppNavigation";
import { ReactNode, useEffect } from "react";
import AppHeader from "@/app/components/AppHeader";
import AppNavbar from "@/app/components/AppNavbar";
import BackButton from "@/app/components/BackButton";
import { usePathname, useSearchParams } from "next/navigation";

interface ConditionalLayoutProps {
  children: ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
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
};

export default ConditionalLayout;

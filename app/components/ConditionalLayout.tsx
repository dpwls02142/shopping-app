"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { ReactNode, useEffect } from "react";
import AppHeader from "@/app/components/AppHeader";
import AppNavbar from "@/app/components/AppNavbar";
import BackButton from "@/app/components/BackButton";
import { usePathname, useSearchParams } from "next/navigation";
import { NavigationPage } from "@/lib/types/navgationType";

interface ConditionalLayoutProps {
  children: ReactNode;
}

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const { showHeader, showNavbar, showBackButton, navigateTo } =
    useAppNavigation();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let page: NavigationPage = "home";

    if (pathname === "/cart") {
      page = "cart";
    } else if (pathname.startsWith("/product/")) {
      page = "product";
    } else if (pathname === "/") {
      const tab = searchParams.get("tab");
      if (tab === "deal") {
        page = "deal";
      } else {
        page = "home";
      }
    }

    navigateTo(page);
  }, [pathname, searchParams, navigateTo]);

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

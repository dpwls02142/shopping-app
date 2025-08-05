import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { NavigationPage } from "@/lib/types/navigationType";

import { NAV_ITEMS } from "@/lib/constants/navigation";

function useAppNavigation() {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<NavigationPage>("home");

  useEffect(() => {
    const foundPage = NAV_ITEMS.find((item) => item.match(pathname));
    setCurrentPage(foundPage?.id || "home");
  }, [pathname]);

  return {
    currentPage,
    mainNavItems: NAV_ITEMS,
  };
}

export { useAppNavigation };

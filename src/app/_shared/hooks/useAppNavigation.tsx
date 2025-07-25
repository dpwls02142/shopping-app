import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { NavigationPage } from "@/lib/types/navigationType";

import { MAIN_NAV_ITEMS, NAV_ITEMS } from "@/lib/constants/navigation";

function useAppNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [navigationState, setNavigationState] = useState({
    currentPage: "home" as NavigationPage,
    isMainPage: true,
  });

  useEffect(() => {
    const currentPage: NavigationPage =
      NAV_ITEMS.find((item) => item.match(pathname, searchParams))?.id ||
      "home";

    const isMainPage = MAIN_NAV_ITEMS.some((item) => item.id === currentPage);

    setNavigationState({ currentPage, isMainPage });
  }, [pathname, searchParams]);

  return {
    ...navigationState,
    mainNavItems: MAIN_NAV_ITEMS,
  };
}

export { useAppNavigation };

import { usePathname, useSearchParams } from "next/navigation";

import {
  MAIN_NAV_ITEMS,
  NAV_ITEMS,
  NavigationPage,
} from "@/lib/constants/navigation";

function useAppNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage: NavigationPage =
    NAV_ITEMS.find((item) => item.match(pathname, searchParams))?.id || "home";

  const isMainPage = MAIN_NAV_ITEMS.some((item) => item.id === currentPage);

  return {
    currentPage,
    isMainPage,
    mainNavItems: MAIN_NAV_ITEMS,
  };
}

export default useAppNavigation;

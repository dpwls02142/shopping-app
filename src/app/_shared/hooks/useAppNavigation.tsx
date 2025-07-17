import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  NAV_ITEMS,
  NavigationPage,
  MAIN_NAV_ITEMS,
} from "@/lib/constants/navigation";

function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage: NavigationPage = ((): NavigationPage => {
    for (const item of NAV_ITEMS) {
      if (item.match(pathname, searchParams)) {
        return item.id;
      }
    }
    return "home";
  })();

  const isMainPage = NAV_ITEMS.some(
    (item) => item.id === currentPage && item.isMain
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    currentPage,
    isMainPage,
    goBack,
    mainNavItems: MAIN_NAV_ITEMS,
  };
}

export { useAppNavigation };

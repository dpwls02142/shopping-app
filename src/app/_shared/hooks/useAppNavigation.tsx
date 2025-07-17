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

  const currentPage: NavigationPage =
    NAV_ITEMS.find((item) => item.match(pathname, searchParams))?.id || "home";

  const isMainPage = MAIN_NAV_ITEMS.some(
    (item) => item.id === currentPage
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

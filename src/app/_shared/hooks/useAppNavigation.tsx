import { useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { NavigationPage } from "@/lib/types/navgationType";

function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = ((): NavigationPage => {
    if (pathname === "/cart") return "cart";
    if (pathname.startsWith("/product/")) return "product";
    if (pathname === "/") {
      const tab = searchParams.get("tab");
      const view = searchParams.get("view");
      if (tab === "deal" || view === "brand" || view === "daily") {
        return "deal";
      }
      return "home";
    }
    return "home";
  })();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    currentPage,
    goBack,
  };
}

export { useAppNavigation };

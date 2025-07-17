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

  const showNavbar = currentPage === "home" || currentPage === "deal";

  const navigateToWithUrl = useCallback(
    (page: NavigationPage, params?: { productId?: string }) => {
      switch (page) {
        case "home":
          router.push("/");
          break;
        case "deal":
          router.push("/?tab=deal");
          break;
        case "cart":
          router.push("/cart");
          break;
        case "product":
          if (params?.productId) {
            router.push(`/product/${params.productId}`);
          }
          break;
        default:
          router.push("/");
          break;
      }
    },
    [router]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    currentPage,
    showNavbar,
    navigateToWithUrl,
    goBack,
  };
}

export { useAppNavigation };

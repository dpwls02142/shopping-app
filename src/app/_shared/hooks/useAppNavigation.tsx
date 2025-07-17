import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { NavigationPage } from "@/lib/types/navgationType";

import useAppNavigationStore from "@/app/_shared/stores/useAppNavigationStore";

function useAppNavigation() {
  const store = useAppNavigationStore();
  const router = useRouter();

  const navigateToWithUrl = useCallback(
    (page: NavigationPage, params?: { productId?: string }) => {
      const isProduct = params?.productId;
      store.navigateTo(page);
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
          if (isProduct) {
            router.push(`/product/${params.productId}`);
          }
          break;
        default:
          router.push("/");
          break;
      }
    },
    [store, router]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    ...store,
    navigateToWithUrl,
    goBack,
  };
}

function useCurrentPage() {
  return useAppNavigationStore((state) => state.currentPage);
}

function useShowHeader() {
  return useAppNavigationStore((state) => state.showHeader);
}

function useShowNavbar() {
  return useAppNavigationStore((state) => state.showNavbar);
}

function useInitializeFromUrl() {
  const { navigateTo } = useAppNavigationStore();

  return useCallback(
    (pathname: string, searchParams: URLSearchParams) => {
      let page: NavigationPage = "home";

      if (pathname === "/cart") {
        page = "cart";
      } else if (pathname.startsWith("/product/")) {
        page = "product";
      } else if (pathname === "/") {
        const tab = searchParams.get("tab");
        const view = searchParams.get("view");
        if (tab === "deal" || view === "brand" || view === "daily") {
          page = "deal";
        } else {
          page = "home";
        }
      }

      navigateTo(page);
    },
    [navigateTo]
  );
}

export {
  useAppNavigation,
  useCurrentPage,
  useInitializeFromUrl,
  useShowHeader,
  useShowNavbar,
};

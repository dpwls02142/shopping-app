import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { NavigationPage } from "@/lib/types/navgationType";

import useNavigationStore from "@/app/_shared/stores/useNavigationStore";

function useAppNavigation() {
  const store = useNavigationStore();
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
  return useNavigationStore((state) => state.currentPage);
}

function useShowHeader() {
  return useNavigationStore((state) => state.showHeader);
}

function useShowNavbar() {
  return useNavigationStore((state) => state.showNavbar);
}

function useInitializeFromUrl() {
  const { navigateTo } = useNavigationStore();

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

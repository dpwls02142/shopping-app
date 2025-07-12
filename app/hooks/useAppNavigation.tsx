import useNavigationStore from "@/lib/store/useNavigationStore";
import { NavigationPage } from "@/lib/types/navgationType";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAppNavigation = () => {
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
};

export const useCurrentPage = () => {
  return useNavigationStore((state) => state.currentPage);
};

export const useShowHeader = () => {
  return useNavigationStore((state) => state.showHeader);
};

export const useShowNavbar = () => {
  return useNavigationStore((state) => state.showNavbar);
};

export const useShowBackButton = () => {
  return useNavigationStore((state) => state.showBackButton);
};

export const useInitializeFromUrl = () => {
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
        if (tab === "deal") {
          page = "deal";
        } else {
          page = "home";
        }
      }

      navigateTo(page);
    },
    [navigateTo]
  );
};

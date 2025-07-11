import { useNavigationStore } from "@/lib/store/useNavigationStore";
import { NavigationStore } from "@/lib/types/navgationType";

export const useAppNavigation = (): NavigationStore => {
  const store = useNavigationStore();

  return {
    currentPage: store.currentPage,
    previousPage: store.previousPage,
    showHeader: store.showHeader,
    showNavbar: store.showNavbar,
    showBackButton: store.showBackButton,

    navigateTo: store.navigateTo,
    goBack: store.goBack,
    setShowHeader: store.setShowHeader,
    setShowNavbar: store.setShowNavbar,
    setShowBackButton: store.setShowBackButton,
  };
};

export const useCurrentPage = () => {
  return useNavigationStore((state) => state.currentPage);
};
export const useShowHeader = () => {
  useNavigationStore((state) => state.showHeader);
};
export const useShowNavbar = () => {
  return useNavigationStore((state) => state.showNavbar);
};
export const useShowBackButton = () => {
  return useNavigationStore((state) => state.showBackButton);
};

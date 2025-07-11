import { useNavigationStore } from "@/lib/store/useNavigationStore";
import { useRouter } from "next/navigation";

export const useAppNavigation = () => {
  const store = useNavigationStore();
  const router = useRouter();

  return {
    ...store,
    goBack: () => router.back(),
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

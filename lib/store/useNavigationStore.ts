import { create } from "zustand";
import { NavigationPage, NavigationStore } from "@/lib/types/navgationType";

export const useNavigationStore = create<NavigationStore>((set, get) => ({
  currentPage: "home",
  previousPage: null,
  showHeader: true,
  showNavbar: true,
  showBackButton: false,

  navigateTo: (page: NavigationPage) => {
    const { currentPage } = get();

    set((state) => {
      const newState = {
        ...state,
        previousPage: currentPage,
        currentPage: page,
      };

      switch (page) {
        case "cart":
          newState.showHeader = false;
          newState.showNavbar = false;
          newState.showBackButton = true;
          break;
        case "product":
          newState.showHeader = false;
          newState.showNavbar = false;
          newState.showBackButton = true;
          break;
        default:
          newState.showHeader = true;
          newState.showNavbar = true;
          newState.showBackButton = false;
      }

      return newState;
    });
  },

  setShowHeader: (show: boolean) => {
    set({ showHeader: show });
  },

  setShowNavbar: (show: boolean) => {
    set({ showNavbar: show });
  },

  setShowBackButton: (show: boolean) => {
    set({ showBackButton: show });
  },
}));

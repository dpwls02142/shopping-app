import { create } from "zustand";
import { persist } from "zustand/middleware";

import { NavigationPage, NavigationStore } from "@/lib/types/navgationType";

const useAppNavigationStore = create<NavigationStore>()(
  persist(
    (set, get) => ({
      currentPage: "home",
      previousPage: null,
      showHeader: true,
      showNavbar: true,

      navigateTo: (page: NavigationPage) => {
        const { currentPage } = get();
        if (currentPage === page) {
          return;
        }

        set((state) => {
          const newState = {
            ...state,
            previousPage: currentPage,
            currentPage: page,
          };

          switch (page) {
            case "cart":
              newState.showNavbar = false;
              break;
            case "product":
              newState.showNavbar = false;
              break;
            case "home":
            case "deal":
              newState.showNavbar = true;
              break;
            default:
              newState.showNavbar = true;
          }

          return newState;
        });
      },


      setShowNavbar: (show: boolean) => {
        set({ showNavbar: show });
      },
    }),
    {
      name: "navigation-storage",
      partialize: (state) => ({
        currentPage: state.currentPage,
        previousPage: state.previousPage,
        showNavbar: state.showNavbar,
      }),
    }
  )
);

export default useAppNavigationStore;

import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import { NavigationPage, NavigationStore } from "@/lib/types/navgationType";

const getUrlSearchParams = (): URLSearchParams => {
  if (typeof window === "undefined") {
    return new URLSearchParams();
  }
  return new URLSearchParams(window.location.search);
};

const urlQueryStorage: StateStorage = {
  getItem: (_key): string | null => {
    if (typeof window === "undefined") return null;

    const searchParams = getUrlSearchParams();
    const tabParam = searchParams.get("tab");

    if (tabParam && (tabParam === "home" || tabParam === "deal")) {
      return JSON.stringify({
        state: {
          currentPage: tabParam,
          previousPage: null,
          showHeader: true,
          showNavbar: true,
          showBackButton: false,
        },
        version: 0,
      });
    }

    return JSON.stringify({
      state: {
        currentPage: "home",
        previousPage: null,
        showHeader: true,
        showNavbar: true,
        showBackButton: false,
      },
      version: 0,
    });
  },

  setItem: (_key, newValue): void => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const parsed = JSON.parse(newValue);
      const currentPage = parsed.state?.currentPage;

      if (currentPage === "home" || currentPage === "deal") {
        const searchParams = getUrlSearchParams();

        if (currentPage === "home") {
          searchParams.delete("tab");
        } else {
          searchParams.set("tab", currentPage);
        }

        const newUrl = `${window.location.pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
        window.history.replaceState(null, "", newUrl);
      }
    } catch (error) {
      console.error(error);
    }
  },

  removeItem: (_key): void => {
    if (typeof window === "undefined") return;

    const searchParams = getUrlSearchParams();
    searchParams.delete("tab");
    const newUrl = `${window.location.pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
    window.history.replaceState(null, "", newUrl);
  },
};

const useNavigationStore = create<NavigationStore>()(
  persist(
    (set, get) => ({
      currentPage: "home",
      previousPage: null,
      showHeader: true,
      showNavbar: true,
      showBackButton: false,

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
              newState.showHeader = false;
              newState.showNavbar = false;
              newState.showBackButton = true;
              break;
            case "product":
              newState.showHeader = true;
              newState.showNavbar = false;
              newState.showBackButton = false;
              break;
            case "home":
            case "deal":
              newState.showHeader = true;
              newState.showNavbar = true;
              newState.showBackButton = false;
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
    }),
    {
      name: "navigation-storage",
      storage: createJSONStorage(() => urlQueryStorage),
      partialize: (state) => ({
        currentPage: state.currentPage,
        previousPage: state.previousPage,
        showHeader: state.showHeader,
        showNavbar: state.showNavbar,
        showBackButton: state.showBackButton,
      }),
    }
  )
);

export default useNavigationStore;

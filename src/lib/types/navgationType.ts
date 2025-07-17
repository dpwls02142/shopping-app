type NavigationPage = "home" | "product" | "cart" | "deal";

type AppNavigationState = {
  currentPage: NavigationPage;
  previousPage: NavigationPage | null;
  showNavbar: boolean;
};

type AppNavigationActions = {
  navigateTo: (page: NavigationPage) => void;
  setShowNavbar: (show: boolean) => void;
};

type NavigationStore = AppNavigationState & AppNavigationActions;

export type {
  AppNavigationActions,
  AppNavigationState,
  NavigationPage,
  NavigationStore,
};

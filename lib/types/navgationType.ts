export type NavigationPage = "home" | "product" | "cart" | "deal";

export type AppNavigationState = {
  currentPage: NavigationPage;
  previousPage: NavigationPage | null;
  showHeader: boolean;
  showNavbar: boolean;
  showBackButton: boolean;
};

export type AppNavigationActions = {
  navigateTo: (page: NavigationPage) => void;
  goBack: () => void;
  setShowHeader: (show: boolean) => void;
  setShowNavbar: (show: boolean) => void;
  setShowBackButton: (show: boolean) => void;
};

export type NavigationStore = AppNavigationState & AppNavigationActions;

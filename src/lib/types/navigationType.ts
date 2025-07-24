type NavigationPage = "home" | "product" | "cart" | "deal";

type NavItem = {
  id: NavigationPage;
  label: string;
  href: string;
  isMain: boolean;
  match: (pathname: string, searchParams: URLSearchParams) => boolean;
};

export type { NavigationPage, NavItem };
type NavigationPage = "home" | "deal";

type NavItem = {
  id: NavigationPage;
  label: string;
  href: string;
  match: (pathname: string) => boolean;
};

export type { NavigationPage, NavItem };

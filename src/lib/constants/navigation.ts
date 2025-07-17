export type NavigationPage = "home" | "product" | "cart" | "deal";

type NavItem = {
  id: NavigationPage;
  label: string;
  href: string;
  isMain: boolean;
  match: (pathname: string, searchParams: URLSearchParams) => boolean;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "쇼핑 홈",
    href: "/",
    isMain: true,
    match: (pathname, searchParams) =>
      pathname === "/" && !searchParams.get("tab") && !searchParams.get("view"),
  },
  {
    id: "deal",
    label: "특가",
    href: "/?tab=deal",
    isMain: true,
    match: (pathname, searchParams) =>
      pathname === "/" &&
      (searchParams.get("tab") === "deal" ||
        searchParams.get("view") === "brand" ||
        searchParams.get("view") === "daily"),
  },
  {
    id: "cart",
    label: "장바구니",
    href: "/cart",
    isMain: false,
    match: (pathname) => pathname === "/cart",
  },
  {
    id: "product",
    label: "상품 상세",
    href: "/product",
    isMain: false,
    match: (pathname) => pathname.startsWith("/product/"),
  },
];

export const MAIN_NAV_ITEMS = NAV_ITEMS.filter((item) => item.isMain);
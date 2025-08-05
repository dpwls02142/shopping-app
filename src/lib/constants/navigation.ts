import { NavItem } from "@/lib/types/navigationType";

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "쇼핑 홈",
    href: "/", // (main) 그룹이라 여전히 /
    isMain: true,
    match: (pathname, searchParams) =>
      pathname === "/" && !searchParams.get("view"),
  },
  {
    id: "deal",
    label: "특가",
    href: "/deal", // 새로운 URL
    isMain: true,
    match: (pathname) =>
      pathname === "/deal" || pathname.startsWith("/deal/"),
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

const MAIN_NAV_ITEMS = NAV_ITEMS.filter((item) => item.isMain);

export { MAIN_NAV_ITEMS, NAV_ITEMS };

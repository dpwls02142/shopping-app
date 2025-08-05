import { NavItem } from "@/lib/types/navigationType";

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "쇼핑 홈",
    href: "/",
    match: (pathname) => pathname === "/",
  },
  {
    id: "deal",
    label: "특가",
    href: "/deal",
    match: (pathname) => pathname === "/deal" || pathname.startsWith("/deal/"),
  },
];

export { NAV_ITEMS };

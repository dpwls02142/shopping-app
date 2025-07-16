import Link from "next/link";

import { NavigationPage } from "@/lib/types/navgationType";

import {
  FLEX_ITEMS_CENTER,
  NAV_CONTAINER,
  NAV_ITEM_ACTIVE,
  NAV_ITEM_BASE,
  NAV_ITEM_INACTIVE,
  NAV_ITEM_LABEL,
} from "@/lib/styles";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

const navItems = [
  { page: "home", label: "쇼핑 홈", href: "/" },
  { page: "deal", label: "특가", href: "/?tab=deal" },
];

function AppNavbar() {
  const { currentPage, navigateToWithUrl } = useAppNavigation();

  const handleTabClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage === page) return;
    navigateToWithUrl(page as NavigationPage);
  };

  return (
    <nav className={NAV_CONTAINER}>
      <div className={FLEX_ITEMS_CENTER + " px-4"}>
        {navItems.map((item) => (
          <Link
            key={item.page}
            href={item.href}
            onClick={(e) => handleTabClick(item.page, e)}
            className={`${NAV_ITEM_BASE} ${
              currentPage === item.page ? NAV_ITEM_ACTIVE : NAV_ITEM_INACTIVE
            }`}
          >
            <span className={NAV_ITEM_LABEL}>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default AppNavbar;

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

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
  {
    id: "home",
    label: "쇼핑 홈",
    href: "/",
  },
  {
    id: "deal",
    label: "특가",
    href: "/?tab=deal",
  },
];

function AppNavbar() {
  const { currentPage } = useAppNavigation();
  const router = useRouter();

  const handleTabClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage === page) return;
    else {
      router.push(navItems.find((item) => item.id === page)?.href || "/");
    }
  };

  return (
    <nav className={NAV_CONTAINER}>
      <div className={cn(FLEX_ITEMS_CENTER, "px-4")}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            onClick={(e) => handleTabClick(item.id, e)}
            className={`${NAV_ITEM_BASE} ${
              currentPage === item.id ? NAV_ITEM_ACTIVE : NAV_ITEM_INACTIVE
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

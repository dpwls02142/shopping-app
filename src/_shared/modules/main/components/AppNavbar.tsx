import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  NAV_CONTAINER,
  NAV_ITEM_ACTIVE,
  NAV_ITEM_BASE,
  NAV_ITEM_INACTIVE,
  NAV_ITEM_LABEL,
} from "@/lib/styles";

import { useAppNavbar } from "@/_shared/modules/main/hooks/useAppNavbar";

function AppNavbar() {
  const { currentPage, mainNavItems } = useAppNavbar();
  const router = useRouter();

  const handleTabClick = (pageId: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage === pageId) return;
    else {
      router.push(mainNavItems.find((item) => item.id === pageId)?.href || "/");
    }
  };

  return (
    <nav className={NAV_CONTAINER}>
      <div className="flex items-center px-4">
        {mainNavItems.map((item) => (
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

export { AppNavbar };

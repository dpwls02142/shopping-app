"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  DEAL_NAV_CONTAINER,
  DEAL_NAV_ICON_ACTIVE,
  DEAL_NAV_ICON_BASE,
  DEAL_NAV_ICON_INACTIVE,
  DEAL_NAV_LABEL_ACTIVE,
  DEAL_NAV_LABEL_BASE,
  DEAL_NAV_LABEL_INACTIVE,
  DEAL_NAV_LINK,
} from "@/lib/styles";

const navItems = [
  {
    id: "daily",
    label: "하루 특가",
    href: "/deal?view=daily",
  },
  {
    id: "brand",
    label: "브랜드 특가",
    href: "/deal?view=brand",
  },
];

function DealNavbar() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "daily";

  return (
    <nav className={DEAL_NAV_CONTAINER}>
      {navItems.map((item) => (
        <Link key={item.id} href={item.href} className={DEAL_NAV_LINK} replace>
          <div
            className={`${DEAL_NAV_ICON_BASE} ${
              currentView === item.id
                ? DEAL_NAV_ICON_ACTIVE
                : DEAL_NAV_ICON_INACTIVE
            }`}
          >
            {item.label.charAt(0)}
          </div>
          <span
            className={`${DEAL_NAV_LABEL_BASE} ${
              currentView === item.id
                ? DEAL_NAV_LABEL_ACTIVE
                : DEAL_NAV_LABEL_INACTIVE
            }`}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export { DealNavbar };

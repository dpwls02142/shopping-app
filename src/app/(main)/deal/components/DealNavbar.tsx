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
    name: "하루 특가",
    view: "daily",
    params: { tab: "deal", view: "daily" },
  },
  {
    name: "브랜드 특가",
    view: "brand",
    params: { tab: "deal", view: "brand" },
  },
];

function DealNavbar() {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") || "daily";

  const createQueryString = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(params)) {
      newSearchParams.set(key, value);
    }
    return newSearchParams.toString();
  };

  return (
    <nav className={DEAL_NAV_CONTAINER}>
      {navItems.map((item) => (
        <Link
          key={item.view}
          href={`/?${createQueryString(item.params)}`}
          className={DEAL_NAV_LINK}
          replace
        >
          <div
            className={`${DEAL_NAV_ICON_BASE} ${
              currentView === item.view
                ? DEAL_NAV_ICON_ACTIVE
                : DEAL_NAV_ICON_INACTIVE
            }`}
          >
            {item.name.charAt(0)}
          </div>
          <span
            className={`${DEAL_NAV_LABEL_BASE} ${
              currentView === item.view
                ? DEAL_NAV_LABEL_ACTIVE
                : DEAL_NAV_LABEL_INACTIVE
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export default DealNavbar;

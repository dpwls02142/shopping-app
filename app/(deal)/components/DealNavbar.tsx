"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

const DealNavbar = () => {
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
    <nav className="flex justify-around items-center py-4 bg-white">
      {navItems.map((item) => (
        <Link
          key={item.view}
          href={`/?${createQueryString(item.params)}`}
          className="flex flex-col items-center space-y-2"
          replace
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
              currentView === item.view
                ? "bg-black text-white scale-105"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {item.name.charAt(0)}
          </div>
          <span
            className={`text-sm font-medium ${
              currentView === item.view ? "text-black" : "text-gray-500"
            }`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default DealNavbar;

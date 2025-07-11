"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const { currentPage } = useAppNavigation();
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/?tab=home");
  };

  const handleDealClick = () => {
    router.push("/?tab=deal");
  };

  return (
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 z-40">
      <div className="flex items-center px-4">
        <button
          onClick={handleHomeClick}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
            currentPage === "home"
              ? "border-black text-black"
              : "border-transparent text-gray-600"
          }`}
        >
          <span className="text-sm font-medium">쇼핑 홈</span>
        </button>

        <button
          onClick={handleDealClick}
          className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
            currentPage === "deal"
              ? "border-black text-black"
              : "border-transparent text-gray-600"
          }`}
        >
          <span className="text-sm font-medium">특가</span>
        </button>
      </div>
    </nav>
  );
};

export default AppNavbar;

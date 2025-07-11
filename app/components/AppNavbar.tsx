import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import Link from "next/link";

const AppNavbar = () => {
  const { currentPage } = useAppNavigation();
  const navItems = [
    { page: "home", label: "쇼핑 홈" },
    { page: "deal", label: "특가" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 z-40">
      <div className="flex items-center px-4">
        {navItems.map((item) => (
          <Link
            key={item.page}
            href={`/?tab=${item.page}`}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 ${
              currentPage === item.page
                ? "border-black text-black"
                : "border-transparent text-gray-600"
            }`}
          >
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AppNavbar;

import Link from "next/link";

import { NavigationPage } from "@/lib/types/navgationType";

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
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 z-40">
      <div className="flex items-center px-4">
        {navItems.map((item) => (
          <Link
            key={item.page}
            href={item.href}
            onClick={(e) => handleTabClick(item.page, e)}
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
}

export default AppNavbar;

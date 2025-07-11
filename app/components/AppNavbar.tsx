import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { NavigationPage } from "@/lib/types/navgationType";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppNavbar = () => {
  const { currentPage, navigateTo } = useAppNavigation();
  const router = useRouter();

  const navItems = [
    { page: "home", label: "쇼핑 홈" },
    { page: "deal", label: "특가" },
  ];

  const handleTabClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (currentPage === page) return;
    navigateTo(page as NavigationPage);
    router.push(`/?tab=${page}`);
  };

  return (
    <nav className="bg-white border-b border-gray-200 flex-shrink-0 z-40">
      <div className="flex items-center px-4">
        {navItems.map((item) => (
          <Link
            key={item.page}
            href={`/?tab=${item.page}`}
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
};

export default AppNavbar;

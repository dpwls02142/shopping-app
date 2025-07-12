import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const AppHeader = () => {
  return (
    <header className="bg-white px-4 py-3 flex-shrink-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">쇼핑</span>
        </div>
        <Link
          href="/cart"
          className="flex items-center space-x-1 p-2 rounded-lg"
          aria-label="장바구니"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700" />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;

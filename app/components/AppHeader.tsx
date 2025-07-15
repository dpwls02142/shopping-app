import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import useCartProductsStore from "@/app/cart/stores/useCartProductsStore";
import { useCurrentPage } from "@/app/hooks/useAppNavigation";

import BackButton from "./BackButton";

const AppHeader = () => {
  const currentPage = useCurrentPage();
  const isMainPage = currentPage === "home" || currentPage === "deal";
  const isCartPage = currentPage === "cart";
  const { totalItems } = useCartProductsStore();

  let displayTotalItems = "";
  if (totalItems > 99) {
    displayTotalItems = "99+";
  } else {
    displayTotalItems = totalItems.toString();
  }

  return (
    <header className="bg-white px-4 py-3 flex-shrink-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isMainPage ? (
            <span className="text-lg font-bold text-gray-900">쇼핑</span>
          ) : (
            <BackButton />
          )}
        </div>
        {!isCartPage && (
          <Link
            href="/cart"
            className="flex items-center space-x-1 p-2 relative"
            aria-label="장바구니"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] font-medium">
                {displayTotalItems}
              </span>
            )}
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppHeader;

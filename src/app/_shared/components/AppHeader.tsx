import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCurrentPage } from "@/app/_shared/hooks/useAppNavigation";

import useCartStore from "@/app/cart/stores/useCartStore";

import BackButton from "@/app/_shared/components/BackButton";

import {
  CART_ALERT,
  ICON,
  TITLE,
  HEADER_CONTAINER,
  FLEX_CENTER,
  HEADER_LEFT_AREA,
  HEADER_RIGHT_AREA,
} from "@/lib/styles";

const MAX_DISPLAY_CART_ITEMS = 99;

function AppHeader() {
  const currentPage = useCurrentPage();
  const isMainPage = currentPage === "home" || currentPage === "deal";
  const isCartPage = currentPage === "cart";
  const { totalItems } = useCartStore();

  let displayTotalItems = "";
  if (totalItems > MAX_DISPLAY_CART_ITEMS) {
    displayTotalItems = "99+";
  } else {
    displayTotalItems = totalItems.toString();
  }

  return (
    <header className={HEADER_CONTAINER}>
      <div className={FLEX_CENTER}>
        <div className={HEADER_LEFT_AREA}>
          {isMainPage ? <span className={TITLE}>쇼핑</span> : <BackButton />}
        </div>
        {!isCartPage && (
          <div className={HEADER_RIGHT_AREA}>
            <Link href="/cart" className="relative" aria-label="장바구니">
              <ShoppingCart className={ICON} />
              {totalItems > 0 && (
                <span className={CART_ALERT}>{displayTotalItems}</span>
              )}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default AppHeader;

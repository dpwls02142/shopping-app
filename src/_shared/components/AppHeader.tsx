import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  BACK_BUTTON,
  CART_ALERT,
  HEADER_CONTAINER,
  HEADER_LEFT_AREA,
  HEADER_RIGHT_AREA,
  ICON,
} from "@/lib/styles";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import { useCartStore } from "@/_shared/modules/cart/stores/useCartStore";

const MAX_DISPLAY_CART_ITEMS = 99;

function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={BACK_BUTTON}
      aria-label="뒤로가기"
    >
      <ArrowLeft className={ICON} />
    </button>
  );
}

function AppHeader() {
  const { totalItems } = useCartStore();

  let displayTotalItems = "";
  if (totalItems > MAX_DISPLAY_CART_ITEMS) {
    displayTotalItems = "99+";
  } else {
    displayTotalItems = totalItems.toString();
  }

  return (
    <header className={HEADER_CONTAINER}>
      <div className="flex items-center justify-between">
        <div className={HEADER_LEFT_AREA}>
          <BackButton />
        </div>
        <div className={HEADER_RIGHT_AREA}>
          <Link href="/cart" className="relative" aria-label="장바구니">
            <ShoppingCart className={ICON} />
            {totalItems > 0 && (
              <span className={CART_ALERT}>{displayTotalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export { AppHeader };

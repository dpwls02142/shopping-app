"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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

const MAIN_PAGES = ["/", "/deal"];

function HeaderTitle() {
  const pathname = usePathname();
  const isMainPage = MAIN_PAGES.includes(pathname);
  return (
    <>
      {isMainPage && <h1 className="text-lg font-bold text-gray-900">쇼핑</h1>}
    </>
  );
}

function BackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const isMainPage = MAIN_PAGES.includes(pathname);
  if (isMainPage) return null;
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

function CartButton() {
  const { totalItems } = useCartStore();
  const pathname = usePathname();
  if (pathname === "/cart") return null;
  let displayTotalItems = "";
  if (totalItems > MAX_DISPLAY_CART_ITEMS) {
    displayTotalItems = "99+";
  } else {
    displayTotalItems = totalItems.toString();
  }
  return (
    <Link href="/cart" className="relative" aria-label="장바구니">
      <ShoppingCart className={ICON} />
      {totalItems > 0 && (
        <span className={CART_ALERT}>{displayTotalItems}</span>
      )}
    </Link>
  );
}

function AppHeader() {
  return (
    <header className={HEADER_CONTAINER}>
      <div className="flex items-center justify-between">
        <div className={HEADER_LEFT_AREA}>
          <HeaderTitle />
          <BackButton />
        </div>
        <div className={HEADER_RIGHT_AREA}>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export { AppHeader };

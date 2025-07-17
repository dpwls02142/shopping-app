"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  CART_BOTTOM_CONTAINER,
  CART_EMPTY_CONTAINER,
  EMPTY_STATE_TEXT,
  SUBMIT_BUTTON,
  TITLE,
} from "@/lib/styles";
import { Button } from "@/ui/button";

import useCartStore from "@/app/cart/stores/useCartStore";

import CartItemList from "@/app/cart/components/CartItemList";
import CartSummary from "@/app/cart/components/CartSummary";

export default function CartPage() {
  const { items, totalItems } = useCartStore();
  const isCartNull = items.length === 0;
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      <div className="flex-1 px-4 py-4 overflow-y-auto">
        <h1 className={cn(TITLE, "mb-4")}>장바구니</h1>
        {isCartNull ? (
          <div className={CART_EMPTY_CONTAINER}>
            <div className={EMPTY_STATE_TEXT}>장바구니가 비어있습니다</div>
            <Link href="/">
              <Button>상품 보러 가기</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 pb-52">
              <CartItemList />
            </div>
            <div className={CART_BOTTOM_CONTAINER}>
              <CartSummary />
              <Button className={SUBMIT_BUTTON}>{totalItems}건 주문하기</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

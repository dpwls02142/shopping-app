"use client";

import Link from "next/link";

import useCartStore from "@/app/cart/stores/useCartStore";

import { Button } from "@/ui/button";

import CartItemList from "@/app/cart/components/CartItemList";
import CartSummary from "@/app/cart/components/CartSummary";
import {
  TITLE,
  CART_EMPTY_CONTAINER,
  EMPTY_STATE_TEXT,
  CART_BOTTOM_CONTAINER,
  SUBMIT_BUTTON,
} from "@/lib/styles";

export default function CartPage() {
  const { items, totalItems } = useCartStore();
  const isCartNull = items.length === 0;
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      <div className="flex-1 px-4 pt-14 overflow-y-auto">
        <h1 className={TITLE}>장바구니</h1>
        {isCartNull ? (
          <div className={CART_EMPTY_CONTAINER}>
            <div className={EMPTY_STATE_TEXT}>장바구니가 비어있습니다</div>
            <Link href="/">
              <Button>상품 보러 가기</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 pb-60">
              <CartItemList />
            </div>
            <div className={CART_BOTTOM_CONTAINER}>
              <CartSummary />
              <Button className={SUBMIT_BUTTON}>
                {totalItems}건 주문하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

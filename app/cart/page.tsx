"use client";

import Link from "next/link";

import CartItemList from "@/app/cart/components/CartItemList";
import CartSummary from "@/app/cart/components/CartSummary";
import { Button } from "@/components/ui/button";

import useCartStore from "@/app/cart/stores/useCartStore";

export default function CartPage() {
  const { items, totalItems } = useCartStore();
  const isCartNull = items.length === 0;
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-50">
      <div className="flex-1 px-4 pt-14 overflow-y-auto">
        <h1 className="text-xl font-bold text-gray-900 mb-4">장바구니</h1>
        {isCartNull ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-gray-500 text-xl mb-4">
              장바구니가 비어있습니다
            </div>
            <Link href="/">
              <Button>상품 보러 가기</Button>
            </Link>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-6 pb-60">
              <CartItemList />
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 max-w-[468px] mx-auto">
              <CartSummary />
              <Button className="w-full outline-none text-lg font-bold h-12 mt-4">
                {totalItems}건 주문하기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

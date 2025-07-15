"use client";

import useCartProductsStore from "@/app/cart/stores/useCartProductsStore";
import { Button } from "@/components/ui/button";

import CartProducts from "./components/CartProducts";
import CartProductsSummary from "./components/CartProductsSummary";

export default function CartPage() {
  const { items, totalItems } = useCartProductsStore();
  const isCartNull = items.length === 0;
  return (
    <div className="flex flex-col min-h-full relative bg-gray-50">
      <div className="px-4 pt-14 pb-60">
        <h1 className="text-xl font-bold text-gray-900 mb-4">장바구니</h1>
        {isCartNull ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-gray-500 text-xl mb-4">
              장바구니가 비어있습니다
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            <CartProducts />
            <CartProductsSummary />
          </div>
        )}
      </div>
      {!isCartNull && (
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button className="w-full outline-none text-lg font-bold h-12">
            {totalItems}건 주문하기
          </Button>
        </div>
      )}
    </div>
  );
}

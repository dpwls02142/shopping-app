"use client";

import CartProducts from "./components/CartProducts";
import CartProductsSummary from "./components/CartProductsSummary";
import useCartProductsStore from "./hooks/useCartProductsStore";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, totalItems } = useCartProductsStore();

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex-1">
        <div className="mx-auto px-4 py-14">
          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-900">장바구니</h1>
          </div>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <div className="text-gray-500 text-xl mb-4">
                장바구니가 비어있습니다
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-6">
                <CartProducts />
                <CartProductsSummary />
              </div>
              <div className="bg-white p-4 sticky bottom-0">
                <Button className="w-full outline-none text-lg font-bold h-12">
                  {totalItems}건 주문하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

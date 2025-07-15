"use client";

import useCartProductsStore from "@/app/cart/stores/useCartStore";
import { formatPriceToKor } from "@/lib/utils";

function CartSummary() {
  const { totalItems, totalPrice } = useCartProductsStore();

  return (
    <div className="bg-white p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {totalItems}건 주문 금액
      </h3>

      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-900">
          총 상품 금액
        </span>
        <span className="text-2xl font-bold text-gray-900">
          {formatPriceToKor(totalPrice)}원
        </span>
      </div>
    </div>
  );
}

export default CartSummary;

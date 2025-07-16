"use client";

import { formatPriceToKor } from "@/lib/utils";

import { FLEX_CENTER, OPTION_TEXT, TITLE } from "@/lib/styles";

import useCartStore from "@/app/cart/stores/useCartStore";

function CartSummary() {
  const { totalItems, totalPrice } = useCartStore();

  return (
    <div className="bg-white p-6 space-y-4">
      <h3 className={TITLE}>{totalItems}건 주문 금액</h3>

      <div className={FLEX_CENTER}>
        <span className={OPTION_TEXT}>총 상품 금액</span>
        <span className={TITLE}>{formatPriceToKor(totalPrice)}원</span>
      </div>
    </div>
  );
}

export default CartSummary;

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

import { useProductBuy } from "@/_shared/modules/product/hooks/useProductBuy";
import { useCartStore } from "@/_shared/modules/cart/stores/useCartStore";

import { Button } from "@/_shared/components/button";
import { CartItemList } from "@/_shared/modules/cart/components/CartItemList";
import { CartSummary } from "@/_shared/modules/cart/components/CartSummary";

function CartView() {
  const { items, totalItems, removeFromCart } = useCartStore();
  const buyMutation = useProductBuy();

  const isCartNull = items.length === 0;

  const handleBuyNow = async () => {
    const options = items.flatMap((item) =>
      item.selectedOptions.map((option) => ({
        optionId: option.id,
        quantityToDeduct: item.quantity,
      }))
    );
    buyMutation.mutateAsync(options, {
      onSuccess: () => {
        items.forEach((item) => removeFromCart(item.id));
      },
    });
  };

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
              <Button
                className={SUBMIT_BUTTON}
                onClick={handleBuyNow}
                disabled={buyMutation.isPending}
              >
                {buyMutation.isPending
                  ? "주문 중..."
                  : `${totalItems}건 주문하기`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { CartView };

"use client";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";

import { formatPriceToKor } from "@/lib/utils";
import {
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";
import { CartItem as CartItemType } from "@/lib/types/cartType";

import { FLEX_CENTER, OPTION_TEXT, TITLE } from "@/lib/styles";
import { Button } from "@/ui/button";
import { X } from "lucide-react";

import useCartStore from "@/app/cart/stores/useCartStore";

import ProductQuantity from "@/app/product/components/ProductQuantity";

type CartItemProps = {
  item: CartItemType;
  onRemove: (itemId: string) => void;
};

function CartItem({ item, onRemove }: CartItemProps) {
  const form = useForm({
    defaultValues: {
      quantity: item.quantity,
    },
  });
  const selectedOptions = createOptionsFromSelection(item.selectedOptions);
  const updateCartItemQuantity = useCartStore((state) => state.updateQuantity);
  const handleQuantityChange = (newQuantity: number) => {
    try {
      updateCartItemQuantity(item.id, newQuantity, item.productOptions);
      form.clearErrors("quantity");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `수량 변경 중 오류가 발생했습니다.`;
      form.setError("quantity", { message: errorMessage });
      form.setValue("quantity", item.quantity);
    }
  };

  return (
    <div className="rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${item.product.id}`} className="flex-1">
            <h3 className={TITLE}>{item.product.name}</h3>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(item.id);
            }}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedOptions).map(([key, value]) => (
                <span key={key} className={OPTION_TEXT}>
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <FormProvider {...form}>
              <ProductQuantity
                control={form.control}
                maxPurchaseQuantity={getMaxPurchaseQuantity(
                  item.productOptions,
                  selectedOptions,
                )}
                selectedOptions={selectedOptions}
                showSelectedOptions={false}
                onQuantityChange={handleQuantityChange}
              />
            </FormProvider>
          </div>
        </div>

        <div className={FLEX_CENTER}>
          <span className={OPTION_TEXT}>주문 금액</span>
          <span className={TITLE}>{formatPriceToKor(item.totalPrice)}원</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

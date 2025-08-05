"use client";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { formatPriceToKor } from "@/lib/utils";
import {
  createOptionsFromSelection,
  getMaxBuyQuantity,
} from "@/lib/utils/productOptionUtils";
import { CartItem as CartItemType } from "@/lib/types/cartType";

import { OPTION_TEXT, TITLE } from "@/lib/styles";
import { Button } from "@/_shared/components/button";
import { X } from "lucide-react";

import { useCartStore } from "@/_shared/modules/cart/stores/useCartStore";

import { ProductQuantity } from "@/_shared/modules/product/components/ProductQuantity";

import { fetchProductOptionsByProductId } from "@/lib/api/productApi";

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
}

function CartItem({ item, onRemove }: CartItemProps) {
  const selectedOptions = createOptionsFromSelection(item.selectedOptions);
  const form = useForm({
    defaultValues: {
      options: selectedOptions,
      quantity: item.quantity,
    },
  });

  const { data: latestProductOptions } = useQuery({
    queryKey: ["productOptions", item.product.id],
    queryFn: () => fetchProductOptionsByProductId(item.product.id),
    staleTime: 1000 * 30,
  });

  const productOptions = latestProductOptions?.length
    ? latestProductOptions
    : item.productOptions;
  const maxBuyQuantity = getMaxBuyQuantity(productOptions, selectedOptions);

  const updateCartItemQuantity = useCartStore((state) => state.updateQuantity);
  const handleQuantityChange = (newQuantity: number) => {
    try {
      updateCartItemQuantity(item.id, newQuantity, productOptions);
      form.clearErrors("quantity");
    } catch (_error: unknown) {
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
                maxBuyQuantity={maxBuyQuantity}
                selectedOptions={selectedOptions}
                showSelectedOptions={false}
                onQuantityChange={handleQuantityChange}
              />
            </FormProvider>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={OPTION_TEXT}>주문 금액</span>
          <span className={TITLE}>{formatPriceToKor(item.totalPrice)}원</span>
        </div>
      </div>
    </div>
  );
}

export { CartItem };

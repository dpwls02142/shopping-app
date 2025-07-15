"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useForm, FormProvider } from "react-hook-form";

import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/lib/types/cartType";
import { formatPriceToKor } from "@/lib/utils";
import {
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
  parseOptionValue,
} from "@/lib/utils/productOptionUtils";

type CartProductCardProps = {
  item: CartItem;
  onRemove: (itemId: string) => void;
};

export default function CartProductCard({
  item,
  onRemove,
}: CartProductCardProps) {
  const form = useForm({
    defaultValues: {
      quantity: item.quantity,
    },
  });

  return (
    <div className="rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Link href={`/product/${item.product.id}`} className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">
              {item.product.name}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {item.selectedOptions.map((option) => (
                <span key={option.optionName} className="text-sm text-gray-600">
                  {option.optionName}: {parseOptionValue(option.optionValue)}
                </span>
              ))}
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <FormProvider {...form}>
              <ProductQuantityForm
                control={form.control}
                maxPurchaseQuantity={getMaxPurchaseQuantity(
                  item.productOptions,
                  createOptionsFromSelection(item.selectedOptions)
                )}
                selectedOptions={createOptionsFromSelection(
                  item.selectedOptions
                )}
                showSelectedOptions={false}
              />
            </FormProvider>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">주문 금액</span>
          <span className="font-semibold text-lg text-gray-900">
            {formatPriceToKor(item.totalPrice)}원
          </span>
        </div>
      </div>
    </div>
  );
}

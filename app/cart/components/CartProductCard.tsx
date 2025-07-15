"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useCartProductsStore from "@/app/cart/stores/useCartProductsStore";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CartItem } from "@/lib/types/cartType";
import { formatPriceToKor } from "@/lib/utils";
import {
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";

type CartProductCardProps = {
  item: CartItem;
  onRemove: (itemId: string) => void;
};

const quantitySchema = z.object({
  quantity: z.number().min(1, "수량은 1개 이상이어야 합니다."),
});

type QuantityFormValues = z.infer<typeof quantitySchema>;

export default function CartProductCard({
  item,
  onRemove,
}: CartProductCardProps) {
  const form = useForm<QuantityFormValues>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: item.quantity,
    },
    mode: "onChange",
  });

  const updateCartItemQuantity = useCartProductsStore(
    (state) => state.updateQuantity
  );

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

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(item.id);
  };

  const itemPrice = item.discountPrice || item.product.basePrice;
  const optionPrice = item.selectedOptions.reduce(
    (sum, option) => sum + option.additionalPrice,
    0
  );
  const totalItemPrice = (itemPrice + optionPrice) * form.watch("quantity");

  const selectedOptions = createOptionsFromSelection(item.selectedOptions);

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
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedOptions).map(([key, value]) => (
                <span key={key} className="text-sm text-gray-600">
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <Form {...form}>
              <div className="flex justify-end">
                <ProductQuantityForm
                  product={item.product}
                  control={form.control}
                  maxPurchaseQuantity={getMaxPurchaseQuantity(
                    item.productOptions,
                    selectedOptions
                  )}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
            </Form>
          </div>
        </div>

        {/* 하단: 주문 금액 */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <span className="text-sm text-gray-600">주문 금액</span>
          <span className="font-semibold text-lg text-gray-900">
            {formatPriceToKor(totalItemPrice)}원
          </span>
        </div>
      </div>
    </div>
  );
}

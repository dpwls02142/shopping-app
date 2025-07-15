"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/lib/types/cartType";
import {
  parseOptionValue,
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";
import { formatPriceToKor } from "@/lib/utils/constant";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCartProductsStore from "@/app/cart/stores/useCartProductsStore";

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

  const ProductOptionDisplay = (item: CartItem) => {
    return item.selectedOptions
      .map((option) => {
        const optionText = parseOptionValue(option.optionValue);
        const priceText =
          option.additionalPrice > 0
            ? ` (+${formatPriceToKor(option.additionalPrice)}원)`
            : "";
        return `${optionText}${priceText}`;
      })
      .join(" / ");
  };

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      await updateCartItemQuantity(item.id, newQuantity, item.productOptions);
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
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/product/${item.product.id}`}>
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {item.product.name}
              </h3>
            </Link>

            <div className="text-sm text-gray-600 mb-3">
              {ProductOptionDisplay(item)}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                {formatPriceToKor(itemPrice + optionPrice)}원
              </span>
              {item.discountPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPriceToKor(item.product.basePrice)}원
                </span>
              )}
            </div>

            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <Form {...form}>
                <ProductQuantityForm
                  product={item.product}
                  control={form.control}
                  hideTitle={true}
                  calculateTotal={() => totalItemPrice}
                  allOptionsSelected={true}
                  maxPurchaseQuantity={getMaxPurchaseQuantity(
                    item.productOptions,
                    selectedOptions
                  )}
                  isCartMode={true}
                  onQuantityChange={handleQuantityChange}
                  selectedOptions={selectedOptions}
                />
              </Form>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

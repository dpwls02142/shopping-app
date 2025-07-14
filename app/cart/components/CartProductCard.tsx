"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { CartItem } from "@/lib/types/cartType";
import {
  parseOptionValue,
  createOptionsFromSelection,
} from "@/lib/utils/productOptionUtils";
import { formatPriceToKor } from "@/lib/utils/constant";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type CartProductCardProps = {
  item: CartItem;
  onQuantityChange: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
};

const quantitySchema = z.object({
  quantity: z.number().min(1, "수량은 1 이상이어야 합니다."),
});

type QuantityFormValues = z.infer<typeof quantitySchema>;

export default function CartProductCard({
  item,
  onQuantityChange,
  onRemove,
}: CartProductCardProps) {
  const form = useForm<QuantityFormValues>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity: item.quantity,
    },
    mode: "onChange",
  });

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

  const handleQuantityChange = (newQuantity: number) => {
    onQuantityChange(item.id, newQuantity);
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
      <div className="p-4 cursor-pointe">
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

            {/* 수량 변경 폼 */}
            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
              <Form {...form}>
                <ProductQuantityForm
                  product={item.product}
                  control={form.control}
                  hideTitle={true}
                  calculateTotal={() => totalItemPrice}
                  allOptionsSelected={true}
                  maxPurchaseQuantity={
                    item.selectedOptions[0]?.maxPurchaseQuantity
                  }
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

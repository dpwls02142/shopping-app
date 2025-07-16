"use client";

import { Control } from "react-hook-form";

import { FLEX_ITEMS_CENTER, OPTION_TEXT } from "@/lib/styles";
import { Button } from "@/ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { MinusIcon, PlusIcon } from "lucide-react";

import useProductQuantity from "@/app/product/[id]/hooks/forms/useProductQuantity";

type AddToCartQuantityProps = {
  control: Control<{ quantity: number }>;
  maxPurchaseQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  selectedOptions?: Record<string, string>;
  showSelectedOptions?: boolean;
};

function AddToCartQuantity({
  control,
  maxPurchaseQuantity = 0,
  onQuantityChange,
}: AddToCartQuantityProps) {
  const { setQuantity } = useProductQuantity({
    control,
    max: maxPurchaseQuantity,
    onChange: onQuantityChange,
  });

  return (
    <div className="bg-gray-50 rounded-lg">
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className={FLEX_ITEMS_CENTER}>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(field.value - 1, field.onChange)}
                  disabled={field.value <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>

                <Input
                  className="w-12 text-center bg-white border-none"
                  type="number"
                  min={1}
                  max={maxPurchaseQuantity}
                  value={field.value}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(value, field.onChange);
                  }}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(field.value + 1, field.onChange)}
                  disabled={field.value >= maxPurchaseQuantity}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default AddToCartQuantity;

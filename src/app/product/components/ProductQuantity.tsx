"use client";

import { Control } from "react-hook-form";
import { MinusIcon, PlusIcon } from "lucide-react";

import useProductQuantity from "@/app/product/hooks/forms/useProductQuantity";

import { Button } from "@/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import { FLEX_ITEMS_CENTER, OPTION_TEXT } from "@/lib/styles";

type ProductQuantityProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  maxPurchaseQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  selectedOptions?: Record<string, string>;
  showSelectedOptions?: boolean;
};

function ProductQuantity({
  control,
  maxPurchaseQuantity = 0,
  onQuantityChange,
  selectedOptions = {},
  showSelectedOptions = true,
}: ProductQuantityProps) {
  const { setQuantity } = useProductQuantity({
    control,
    max: maxPurchaseQuantity,
    onChange: onQuantityChange,
  });

  const hasSelectedOptions = Object.values(selectedOptions).some(
    (value) => value !== ""
  );

  return (
    <div className="bg-gray-50 rounded-lg">
      {hasSelectedOptions && showSelectedOptions && (
        <div className={OPTION_TEXT}>
          {Object.entries(selectedOptions)
            .filter(([_, value]) => value !== "")
            .map(([key, value]) => `${key}: ${value}`)
            .join(" / ")}
        </div>
      )}

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

export default ProductQuantity;

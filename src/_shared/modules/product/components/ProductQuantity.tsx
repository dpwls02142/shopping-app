"use client";

import { Control } from "react-hook-form";

import { ICON } from "@/lib/styles";
import { MinusIcon, PlusIcon } from "lucide-react";

import { useProductQuantity } from "@/_shared/modules/product/hooks/forms/useProductQuantity";

import { Button } from "@/_shared/components/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/_shared/components/form";
import { Input } from "@/_shared/components/input";

interface ProductQuantityProps {
  control: Control<{ options: Record<string, string>; quantity: number }>;
  maxBuyQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  selectedOptions?: Record<string, string>;
  showSelectedOptions?: boolean;
}

function ProductQuantity({
  control,
  maxBuyQuantity = 0,
  onQuantityChange,
}: ProductQuantityProps) {
  const { setQuantity } = useProductQuantity({
    control,
    max: maxBuyQuantity,
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
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(field.value - 1, field.onChange)}
                  disabled={field.value <= 1}
                >
                  <MinusIcon className={ICON} />
                </Button>

                <Input
                  className="w-12 text-center bg-white border-none"
                  type="number"
                  min={1}
                  max={maxBuyQuantity}
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
                  disabled={field.value >= maxBuyQuantity}
                >
                  <PlusIcon className={ICON} />
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

export { ProductQuantity };

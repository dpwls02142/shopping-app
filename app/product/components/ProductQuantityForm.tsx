"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ProductQuantityFormProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  maxPurchaseQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
  selectedOptions?: Record<string, string>;
};

function ProductQuantityForm({
  control,
  maxPurchaseQuantity = 0,
  onQuantityChange,
  selectedOptions = {},
}: ProductQuantityFormProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > maxPurchaseQuantity && maxPurchaseQuantity > 0) {
      return;
    }
    onQuantityChange?.(newQuantity);
  };

  const hasSelectedOptions = Object.values(selectedOptions).some(
    (value) => value !== ""
  );

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      {hasSelectedOptions && (
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-600">
            {Object.entries(selectedOptions)
              .filter(([_, value]) => value !== "")
              .map(([key, value]) => `${key}: ${value}`)
              .join(" / ")}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <FormField
          control={control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newQuantity = field.value - 1;
                      if (newQuantity >= 1) {
                        field.onChange(newQuantity);
                        handleQuantityChange(newQuantity);
                      }
                    }}
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
                      e.stopPropagation();
                      const value = parseInt(e.target.value) || 1;
                      field.onChange(value);
                      handleQuantityChange(value);
                    }}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newQuantity = field.value + 1;
                      if (newQuantity <= maxPurchaseQuantity) {
                        field.onChange(newQuantity);
                        handleQuantityChange(newQuantity);
                      }
                    }}
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
    </div>
  );
}

export default ProductQuantityForm;

"use client";

import { cn, formatPriceToKor } from "@/lib/utils";
import { notification } from "@/lib/utils/notification";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import { ADD_TO_CART_BOTTOM_CONTAINER, OPTION_TEXT, TITLE } from "@/lib/styles";

import { useProductActionForm } from "@/_shared/modules/product/hooks/forms/useProductActionForm";

import { Button } from "@/_shared/components/button";
import { Form } from "@/_shared/components/form";
import { ProductOptions } from "@/_shared/modules/product/components/ProductOptions";
import { ProductQuantity } from "@/_shared/modules/product/components/ProductQuantity";

import { ERROR_MESSAGE } from "@/lib/constants/message";

interface AddToCartFormProps {
  productDetail: ProductDetailInfo;
  onAddToCart?: (optionId: string, quantity: number) => void;
}

function AddToCartForm({ productDetail, onAddToCart }: AddToCartFormProps) {
  const {
    form,
    productOptions,
    watchedOptions,
    watchedQuantity,
    totalAmount,
    maxBuyQuantity,
    allOptionsSelected,
    currentMatchingOption,
    handleOptionChange,
    handleQuantityChange,
  } = useProductActionForm({
    productDetail,
  });

  function handleAddToCartClick() {
    if (!allOptionsSelected || !currentMatchingOption) {
      notification.error(ERROR_MESSAGE.MISSING_OPTIONS);
      return;
    }
    onAddToCart?.(currentMatchingOption.id, watchedQuantity);
  }

  return (
    <Form {...form}>
      <form className="p-4">
        <ProductOptions
          productOptions={productOptions || []}
          control={form.control}
          onSelectionChange={handleOptionChange}
        />

        <div className="space-y-4 pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className={OPTION_TEXT}>선택한 옵션</span>
            <div className="flex items-start justify-between">
              <div className="flex flex-wrap">
                {convertRecordToKeyValueArray(watchedOptions).map((option) => (
                  <span key={option.key} className={cn(OPTION_TEXT, "mr-2")}>
                    {option.key}: {option.value}
                  </span>
                ))}
              </div>
              <div>
                <ProductQuantity
                  control={form.control}
                  maxBuyQuantity={maxBuyQuantity}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={ADD_TO_CART_BOTTOM_CONTAINER}>
          <div className="flex items-center justify-between mb-4">
            <span className={OPTION_TEXT}>상품 금액</span>
            <span className={TITLE}>{formatPriceToKor(totalAmount)}원</span>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              className="flex-1 h-12 text-lg font-bold"
              disabled={!allOptionsSelected}
              onClick={handleAddToCartClick}
            >
              장바구니
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { AddToCartForm };

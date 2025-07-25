"use client";

import { cn, formatPriceToKor } from "@/lib/utils";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import { ADD_TO_CART_BOTTOM_CONTAINER, OPTION_TEXT, TITLE } from "@/lib/styles";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

import { useProductActionForm } from "@/app/product/[id]/hooks/forms/useProductActionForm";

import { ProductOptions } from "@/app/product/components/ProductOptions";
import { ProductQuantity } from "@/app/product/components/ProductQuantity";

import { ERROR_MESSAGE } from "@/lib/constants/message";

interface ProductActionFormProps {
  productDetail: ProductDetailInfo;
  onAddToCart?: (optionId: string, quantity: number) => void;
  onBuyNow?: (optionId: string, quantity: number) => void;
}

function ProductActionForm({
  productDetail,
  onAddToCart,
  onBuyNow,
}: ProductActionFormProps) {
  const {
    form,
    productOptions,
    watchedOptions,
    watchedQuantity,
    totalAmount,
    maxPurchaseQuantity,
    allOptionsSelected,
    currentMatchingOption,
    handleOptionSelectionChange,
    handleQuantityChange,
  } = useProductActionForm({ productDetail });

  function handleAddToCartClick() {
    if (!allOptionsSelected || !currentMatchingOption) {
      alert(ERROR_MESSAGE.MISSING_OPTIONS);
      return;
    }
    onAddToCart?.(currentMatchingOption.id, watchedQuantity);
  }

  function handleBuyNowClick() {
    if (!allOptionsSelected || !currentMatchingOption) {
      alert(ERROR_MESSAGE.MISSING_OPTIONS);
      return;
    }
    onBuyNow?.(currentMatchingOption.id, watchedQuantity);
  }

  return (
    <Form {...form}>
      <form className="p-4">
        <ProductOptions
          productOptions={productOptions || []}
          control={form.control}
          onSelectionChange={handleOptionSelectionChange}
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
                  maxPurchaseQuantity={maxPurchaseQuantity}
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
            <Button
              type="button"
              className="flex-1 h-12 text-lg font-bold bg-blue-500 hover:bg-blue-600"
              disabled={!allOptionsSelected}
              onClick={handleBuyNowClick}
            >
              구매하기
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { ProductActionForm };

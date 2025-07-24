"use client";

import { cn, formatPriceToKor } from "@/lib/utils";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import { ADD_TO_CART_BOTTOM_CONTAINER, OPTION_TEXT, TITLE } from "@/lib/styles";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

import { useAddToCartForm } from "@/app/product/[id]/hooks/forms/useAddToCartForm";
import { useProductPurchase } from "@/app/product/hooks/useProductPurchase";

import { ProductOptions } from "@/app/product/components/ProductOptions";
import { ProductQuantity } from "@/app/product/components/ProductQuantity";

interface AddToCartFormProps {
  productDetail: ProductDetailInfo;
  onSuccess?: () => void;
}

function AddToCartForm({ productDetail, onSuccess }: AddToCartFormProps) {
  const addToCartForm = useAddToCartForm({ productDetail, onSuccess });
  const updateStockMutation = useProductPurchase();

  const handleBuyNow = async () => {
    if (!addToCartForm.allOptionsSelected) {
      alert(`옵션을 모두 선택해주세요.`);
      return;
    }
    if (!addToCartForm.currentMatchingOption) {
      alert(`선택된 옵션을 찾을 수 없습니다.`);
      return;
    }
    try {
      await updateStockMutation.mutateAsync({
        optionId: addToCartForm.currentMatchingOption.id,
        quantityToDeduct: addToCartForm.watchedQuantity,
      });
      alert(`구매 완료`);
      onSuccess?.();
    } catch (error: unknown) {
      alert(
        error instanceof Error ? error.message : `구매 중 오류가 발생했습니다.`
      );
    }
  };

  return (
    <Form {...addToCartForm.form}>
      <form
        onSubmit={addToCartForm.form.handleSubmit(addToCartForm.onSubmit)}
        className="p-4"
      >
        <ProductOptions
          productOptions={addToCartForm.productOptions || []}
          control={addToCartForm.form.control}
          onSelectionChange={addToCartForm.handleOptionSelectionChange}
        />

        <div className="space-y-4 pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <span className={OPTION_TEXT}>선택한 옵션</span>

            <div className="flex items-start justify-between">
              <div className="flex flex-wrap">
                {convertRecordToKeyValueArray(addToCartForm.watchedOptions).map(
                  (option) => (
                    <span key={option.key} className={cn(OPTION_TEXT, "mr-2")}>
                      {option.key}: {option.value}
                    </span>
                  )
                )}
              </div>

              <div>
                <ProductQuantity
                  control={addToCartForm.form.control}
                  maxPurchaseQuantity={addToCartForm.maxPurchaseQuantity}
                  onQuantityChange={addToCartForm.handleQuantityChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={ADD_TO_CART_BOTTOM_CONTAINER}>
          <div className="flex items-center justify-between mb-4">
            <span className={OPTION_TEXT}>상품 금액</span>
            <span className={TITLE}>
              {formatPriceToKor(addToCartForm.totalAmount)}원
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1 h-12 text-lg font-bold"
              disabled={!addToCartForm.allOptionsSelected}
            >
              장바구니
            </Button>
            <Button
              type="button"
              className="flex-1 h-12 text-lg font-bold bg-blue-500 hover:bg-blue-600"
              disabled={
                !addToCartForm.allOptionsSelected ||
                updateStockMutation.isPending
              }
              onClick={handleBuyNow}
            >
              {updateStockMutation.isPending ? "구매 중..." : "구매하기"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { AddToCartForm };

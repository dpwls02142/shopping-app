"use client";

import { cn, formatPriceToKor } from "@/lib/utils";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import {
  FLEX_CENTER,
  FLEX_ITEMS_START_BETWEEN,
  FLEX_WRAP,
  OPTION_TEXT,
  ADD_TO_CART_BOTTOM_CONTAINER,
  SUBMIT_BUTTON,
  TITLE,
} from "@/lib/styles";
import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

import useAddToCartForm from "@/app/product/[id]/hooks/forms/useAddToCartForm";

import ProductOptions from "@/app/product/[id]/components/AddToCartOptions";
import ProductQuantity from "@/app/product/[id]/components/AddToCartQuantity";

type AddToCartFormProps = {
  productDetail: ProductDetailInfo;
  onSuccess?: () => void;
};

function AddToCartForm({ productDetail, onSuccess }: AddToCartFormProps) {
  const addToCartForm = useAddToCartForm({ productDetail, onSuccess });

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

            <div className={FLEX_ITEMS_START_BETWEEN}>
              <div className={FLEX_WRAP}>
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
      </form>
      <div className={ADD_TO_CART_BOTTOM_CONTAINER}>
        <div className={cn(FLEX_CENTER, "mb-4")}>
          <span className={OPTION_TEXT}>상품 금액</span>
          <span className={TITLE}>
            {formatPriceToKor(addToCartForm.totalAmount)}원
          </span>
        </div>
        <Button
          type="submit"
          className={SUBMIT_BUTTON}
          disabled={!addToCartForm.allOptionsSelected}
        >
          장바구니
        </Button>
      </div>
    </Form>
  );
}

export default AddToCartForm;

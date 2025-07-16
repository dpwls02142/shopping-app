"use client";

import { ProductDetailInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";

import useAddToCartForm from "@/app/product/hooks/forms/useAddToCartForm";

import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

import ProductOptions from "@/app/product/components/ProductOptions";
import ProductQuantity from "@/app/product/components/ProductQuantity";
import {
  FLEX_CENTER,
  FLEX_ITEMS_START,
  FLEX_WRAP,
  OPTION_TEXT,
  SUBMIT_BUTTON,
  TITLE,
} from "@/lib/styles";

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
            <span className="text-sm text-gray-600 mb-1 block">
              선택한 옵션
            </span>

            <div className={FLEX_ITEMS_START}>
              <div className={FLEX_WRAP}>
                {convertRecordToKeyValueArray(addToCartForm.watchedOptions).map(
                  (option) => (
                    <span key={option.key} className={OPTION_TEXT}>
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

        <div className="pt-2">
          <div className={FLEX_CENTER}>
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
      </form>
    </Form>
  );
}

export default AddToCartForm;

"use client";

import useAddToCartForm from "@/app/product/hooks/forms/useAddToCartForm";

import ProductOptions from "@/app/product/components/ProductOptions";
import ProductQuantity from "@/app/product/components/ProductQuantity";

import { ProductDetailInfo } from "@/lib/types/productType";

import { formatPriceToKor } from "@/lib/utils";
import { convertRecordToKeyValueArray } from "@/lib/utils/productOptionUtils";

import { Button } from "@/ui/button";
import { Form } from "@/ui/form";

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

            <div className="flex justify-between items-start">
              <div className="flex flex-wrap items-center gap-2">
                {convertRecordToKeyValueArray(addToCartForm.watchedOptions).map(
                  (option) => (
                    <span key={option.key} className="text-sm text-gray-600">
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
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-600">상품 금액</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPriceToKor(addToCartForm.totalAmount)}원
            </span>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg"
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

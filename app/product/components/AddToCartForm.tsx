"use client";

import ProductOptionSelector from "@/app/product/components/ProductOptionSelector";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { useAddToCartForm } from "@/app/product/hooks/forms/useAddToCartForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductDetailInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";
import { parseOptionValue } from "@/lib/utils/productOptionUtils";

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
        <ProductOptionSelector
          productOptions={addToCartForm.productOptions || []}
          control={addToCartForm.form.control}
          onSelectionChange={addToCartForm.handleOptionSelectionChange}
        />

        <div className="space-y-4 pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center">
                {parseOptionValue(JSON.stringify(addToCartForm.watchedOptions))}
              </div>
              <ProductQuantityForm
                control={addToCartForm.form.control}
                maxPurchaseQuantity={addToCartForm.maxPurchaseQuantity}
                onQuantityChange={addToCartForm.handleQuantityChange}
              />
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

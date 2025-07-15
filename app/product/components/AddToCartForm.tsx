"use client";

import ProductOptionSelector from "@/app/product/components/ProductOptionSelector";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { useAddToCartForm } from "@/app/product/hooks/forms/useAddToCartForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProductDetailInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";

type AddToCartFormProps = {
  productDetail: ProductDetailInfo;
  onSuccess?: () => void;
};

function AddToCartForm({ productDetail, onSuccess }: AddToCartFormProps) {
  const {
    form,
    totalAmount,
    allOptionsSelected,
    maxPurchaseQuantity,
    watchedOptions,
    productOptions,
    product,
    handleOptionSelectionChange,
    handleQuantityChange,
    onSubmit,
  } = useAddToCartForm({
    productDetail,
    onSuccess,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
        <ProductOptionSelector
          productOptions={productOptions || []}
          control={form.control}
          onSelectionChange={handleOptionSelectionChange}
        />

        <div className="space-y-4 pt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <ProductQuantityForm
                product={product}
                control={form.control}
                maxPurchaseQuantity={maxPurchaseQuantity}
                onQuantityChange={handleQuantityChange}
                selectedOptions={watchedOptions}
              />

              <div className="font-semibold text-lg">
                {formatPriceToKor(totalAmount)}원
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg text-gray-600">상품 금액</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPriceToKor(totalAmount)}원
            </span>
          </div>
          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={!allOptionsSelected}
          >
            장바구니
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddToCartForm;

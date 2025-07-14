"use client";

import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductDetailInfo } from "@/lib/types/productType";
import useCartProductsStore from "@/app/cart/hooks/useCartProductsStore";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ProductOptionSelector from "@/app/product/components/ProductOptionSelector";
import ProductQuantityForm from "@/app/product/components/ProductQuantityForm";
import { formatPriceToKor } from "@/lib/utils/constant";
import {
  extractOptionKeys,
  findMatchingOption,
  getMaxPurchaseQuantity,
  areAllOptionsSelected,
  validateQuantity,
} from "@/lib/utils/productOptionUtils";

type AddToCartFormProps = {
  productDetail: ProductDetailInfo;
  onSuccess?: () => void;
  onSelectionChange?: (
    selectedOptions: Record<string, string>,
    quantity: number
  ) => void;
  hideTitle?: boolean;
  hideSubmitButton?: boolean;
  hideTotal?: boolean;
  formOnly?: boolean;
  isCartMode?: boolean;
  initialValues?: {
    options?: Record<string, string>;
    quantity?: number;
  };
};

function AddToCartForm({
  productDetail,
  onSuccess,
  onSelectionChange,
  hideTitle = false,
  hideSubmitButton = false,
  hideTotal = false,
  formOnly = false,
  isCartMode = false,
  initialValues,
}: AddToCartFormProps) {
  const { product, options: productOptions, discount } = productDetail;
  const addToCart = useCartProductsStore((state) => state.addToCart);

  const formSchema = z.object({
    options: z.record(z.string(), z.string()),
    quantity: z.number().min(1, "수량은 1 이상이어야 합니다."),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      options: initialValues?.options || {},
      quantity: initialValues?.quantity || 1,
    },
    mode: "onChange",
  });

  const watchedOptions = useWatch({ control: form.control, name: "options" });
  const watchedQuantity = useWatch({ control: form.control, name: "quantity" });

  const optionKeys = extractOptionKeys(productOptions || []);
  const currentMatchingOption = findMatchingOption(
    productOptions || [],
    watchedOptions
  );
  const allOptionsSelected = areAllOptionsSelected(optionKeys, watchedOptions);
  const maxPurchaseQuantity = getMaxPurchaseQuantity(
    productOptions || [],
    watchedOptions
  );

  const totalAmount = (() => {
    if (!currentMatchingOption) return 0;
    const basePrice = discount?.discountedPrice || product.basePrice;
    const optionPrice = currentMatchingOption.additionalPrice;
    return (basePrice + optionPrice) * watchedQuantity;
  })();

  const handleOptionSelectionChange = (newOptions: Record<string, string>) => {
    form.setValue("options", newOptions);

    if (!initialValues?.quantity) {
      form.setValue("quantity", 1);
    }
    onSelectionChange?.(newOptions, watchedQuantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (
      allOptionsSelected &&
      !validateQuantity(productOptions || [], watchedOptions, newQuantity)
    ) {
      form.setError("quantity", {
        message: `최대 구매 가능 수량은 ${maxPurchaseQuantity}개입니다.`,
      });
      return;
    }
    form.clearErrors("quantity");
    onSelectionChange?.(watchedOptions, newQuantity);
  };

  const onSubmit = (values: FormValues) => {
    if (formOnly) return;

    if (!allOptionsSelected) {
      form.setError("options", {
        message: `모든 옵션을 선택해주세요.`,
      });
      return;
    }

    if (!currentMatchingOption) {
      return;
    }

    if (
      !validateQuantity(productOptions || [], values.options, values.quantity)
    ) {
      form.setError("quantity", {
        message: `최대 구매 가능 수량은 ${maxPurchaseQuantity}개입니다.`,
      });
      return;
    }

    try {
      addToCart(
        product,
        [currentMatchingOption],
        values.quantity,
        discount?.discountedPrice,
        productOptions
      );
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "장바구니 추가 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-4 ${hideTitle ? "p-4 pt-2" : "p-4"}`}
      >
        <ProductOptionSelector
          productOptions={productOptions || []}
          control={form.control}
          onSelectionChange={handleOptionSelectionChange}
        />
        <ProductQuantityForm
          product={product}
          control={form.control}
          hideTitle={hideTitle}
          calculateTotal={() => totalAmount}
          allOptionsSelected={allOptionsSelected}
          maxPurchaseQuantity={maxPurchaseQuantity}
          isCartMode={isCartMode}
          onQuantityChange={handleQuantityChange}
          selectedOptions={watchedOptions}
        />

        {!hideSubmitButton && !hideTotal && (
          <>
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
          </>
        )}
      </form>
    </Form>
  );
}

export default AddToCartForm;

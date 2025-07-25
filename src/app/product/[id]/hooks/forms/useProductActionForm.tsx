"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  areAllOptionsSelected,
  calculateItemPrice,
  extractOptionKeys,
  findMatchingOption,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import { useCartStore } from "@/app/cart/stores/useCartStore";

import { ERROR_MESSAGE } from "@/lib/constants/errorMessage";

interface UseProductActionFormProps {
  productDetail: ProductDetailInfo;
  onSuccess?: () => void;
}

function useProductActionForm({
  productDetail,
  onSuccess,
}: UseProductActionFormProps) {
  const { product, options: productOptions, discount } = productDetail;
  const addToCart = useCartStore((state) => state.addToCart);

  const formSchema = z.object({
    options: z.record(z.string(), z.string()),
    quantity: z.number().min(1, ERROR_MESSAGE.QUANTITY_MINIMUM),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      options: {},
      quantity: 1,
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

  const totalAmount = currentMatchingOption
    ? calculateItemPrice(
        product.basePrice,
        [currentMatchingOption],
        watchedQuantity,
        discount?.discountedPrice
      )
    : 0;

  const handleOptionSelectionChange = (newOptions: Record<string, string>) => {
    form.setValue("options", newOptions);
    form.setValue("quantity", 1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    form.clearErrors("quantity");
    form.setValue("quantity", newQuantity);
  };

  const onSubmit = (values: FormValues) => {
    if (!allOptionsSelected) {
      form.setError("options", {
        message: ERROR_MESSAGE.MISSING_OPTIONS,
      });
      return;
    }

    if (!currentMatchingOption) {
      form.setError("options", {
        message: ERROR_MESSAGE.NOT_FOUND_OPTIONS,
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
      form.setError("quantity", {
        message: errorMessage,
      });
    }
  };

  return {
    form,
    totalAmount,
    allOptionsSelected,
    maxPurchaseQuantity,
    watchedOptions,
    watchedQuantity,
    productOptions,
    product,
    currentMatchingOption,
    handleOptionSelectionChange,
    handleQuantityChange,
    onSubmit,
  };
}

export { useProductActionForm };

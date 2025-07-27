"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  areAllOptionsSelected,
  calculateItemPrice,
  extractOptionKeys,
  findMatchingOption,
  getMaxBuyQuantity,
} from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import { ERROR_MESSAGE } from "@/lib/constants/message";

interface UseProductActionFormProps {
  productDetail: ProductDetailInfo;
}

function useProductActionForm({ productDetail }: UseProductActionFormProps) {
  const { product, options: productOptions, discount } = productDetail;

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
  const maxBuyQuantity = getMaxBuyQuantity(
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

  const handleOptionChange = (newOptions: Record<string, string>) => {
    form.setValue("options", newOptions);
    form.setValue("quantity", 1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    form.clearErrors("quantity");
    form.setValue("quantity", newQuantity);
  };

  return {
    form,
    totalAmount,
    allOptionsSelected,
    maxBuyQuantity,
    watchedOptions,
    watchedQuantity,
    productOptions,
    product,
    currentMatchingOption,
    handleOptionChange,
    handleQuantityChange,
  };
}

export { useProductActionForm };

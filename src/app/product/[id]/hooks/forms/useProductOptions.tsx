import { Control, useWatch } from "react-hook-form";

import {
  extractOptionKeys,
  safelyParseOptionValue,
} from "@/lib/utils/productOptionUtils";
import { ProductOption } from "@/lib/types/productType";

function useProductOptions(
  productOptions: ProductOption[],
  control: Control<{ options: Record<string, string>; quantity: number }>
) {
  const optionKeys = extractOptionKeys(productOptions);
  const watchedOptions = useWatch({ control, name: "options" });
  const separated: Record<string, { value: string; option: ProductOption }[]> =
    {};

  productOptions?.forEach((option) => {
    const parsed = safelyParseOptionValue(option);

    Object.entries(parsed).forEach(([key, value]) => {
      if (!separated[key]) {
        separated[key] = [];
      }

      if (!separated[key].some((item) => item.value === value)) {
        separated[key].push({ value, option });
      }
    });
  });

  const handleOptionChange = (
    key: string,
    value: string,
    onChange: (opts: Record<string, string>) => void
  ) => {
    const newOptions = { ...watchedOptions, [key]: value };
    onChange(newOptions);
  };

  return {
    watchedOptions,
    separatedOptions: separated,
    optionKeys,
    handleOptionChange,
  };
}

export default useProductOptions;

import { Control, useWatch } from "react-hook-form";

import { ProductOption } from "@/lib/types/productType";

function useProductOptions(
  productOptions: ProductOption[],
  control: Control<{ options: Record<string, string> }>
) {
  const watchedOptions = useWatch({ control, name: "options" });

  const separated: Record<string, { value: string; option: ProductOption }[]> =
    {};
  const keys: string[] = [];

  productOptions?.forEach((option) => {
    try {
      const parsed = JSON.parse(option.optionValue);
      Object.entries(parsed).forEach(([key, value]) => {
        if (!separated[key]) {
          separated[key] = [];
          keys.push(key);
        }

        if (!separated[key].some((item) => item.value === value)) {
          separated[key].push({ value: value as string, option });
        }
      });
    } catch (error) {
      console.error(error);
    }
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
    optionKeys: keys,
    handleOptionChange,
  };
}

export default useProductOptions;

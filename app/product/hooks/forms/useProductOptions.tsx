import { Control,useWatch } from "react-hook-form";

import { ProductOption } from "@/lib/types/productType";

type SeparatedOptionsReturn = {
  separatedOptions: Record<string, { value: string; option: ProductOption }[]>;
  optionKeys: string[];
};

function useProductOptions(
  productOptions: ProductOption[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
) {
  const watchedOptions = useWatch({ control, name: "options" });

  const separatedOptions: SeparatedOptionsReturn = (() => {
    const separated: Record<
      string,
      { value: string; option: ProductOption }[]
    > = {};
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

    return { separatedOptions: separated, optionKeys: keys };
  })();

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
    separatedOptions,
    optionKeys: Object.keys(separatedOptions),
    handleOptionChange,
  };
}

export default useProductOptions;

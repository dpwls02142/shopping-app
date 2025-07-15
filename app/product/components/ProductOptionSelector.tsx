import { Control, useWatch } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductOption } from "@/lib/types/productType";

type ProductOptionSelectorProps = {
  productOptions: ProductOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  onSelectionChange: (selectedOptions: Record<string, string>) => void;
};

function ProductOptionSelector({
  productOptions,
  control,
  onSelectionChange,
}: ProductOptionSelectorProps) {
  const { separatedOptions, optionKeys } = (() => {
    if (!productOptions || productOptions.length === 0) {
      return { separatedOptions: {}, optionKeys: [] };
    }

    const separated: Record<
      string,
      Array<{ value: string; option: ProductOption }>
    > = {};
    const keys: string[] = [];

    productOptions.forEach((option) => {
      try {
        const parsedOptions = JSON.parse(option.optionValue);
        Object.entries(parsedOptions).forEach(([key, value]) => {
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

  const watchedOptions = useWatch({ control, name: "options" });

  const handleOptionChange = (key: string, value: string) => {
    const newOptions = { ...watchedOptions, [key]: value };
    onSelectionChange(newOptions);
  };

  return (
    <div className="space-y-4">
      {optionKeys.map((key, index) => {
        const isDisabled =
          index > 0 &&
          !optionKeys
            .slice(0, index)
            .every((prevKey) => watchedOptions[prevKey] !== "");

        return (
          <FormField
            key={key}
            control={control}
            name={`options.${key}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key}</FormLabel>
                <Select
                  onValueChange={(value) => handleOptionChange(key, value)}
                  value={field.value || ""}
                  disabled={isDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`${key} 선택`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {separatedOptions[key]?.map((option, optionIndex) => (
                      <SelectItem key={optionIndex} value={option.value}>
                        {option.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      })}
    </div>
  );
}

export default ProductOptionSelector;

import { Control } from "react-hook-form";

import useProductOptions from "@/app/product/hooks/forms/useProductOptions";
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
  const { separatedOptions, optionKeys, watchedOptions, handleOptionChange } =
    useProductOptions(productOptions, control);

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
                  value={field.value || ""}
                  onValueChange={(value) =>
                    handleOptionChange(key, value, onSelectionChange)
                  }
                  disabled={isDisabled}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`${key} 선택`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {separatedOptions.separatedOptions[key]?.map(
                      (item, idx) => (
                        <SelectItem key={idx} value={item.value}>
                          {item.value}
                        </SelectItem>
                      )
                    )}
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

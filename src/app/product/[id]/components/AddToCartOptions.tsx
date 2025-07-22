import { Control } from "react-hook-form";

import { ProductOption } from "@/lib/types/productType";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

import useProductOptions from "@/app/product/[id]/hooks/forms/useProductOptions";

interface AddToCartOptionsProps {
  productOptions: ProductOption[];
  control: Control<{ options: Record<string, string>; quantity: number }>;
  onSelectionChange: (selectedOptions: Record<string, string>) => void;
}

function AddToCartOptions({
  productOptions,
  control,
  onSelectionChange,
}: AddToCartOptionsProps) {
  const {
    separatedOptions,
    optionKeys,
    watchedOptions,
    openDropdowns,
    handleOptionChange,
    handleDropdownToggle,
  } = useProductOptions(productOptions, control);

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
                  open={openDropdowns[key] || false}
                  onOpenChange={(isOpen) => handleDropdownToggle(key, isOpen)}
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
                    {separatedOptions[key]?.map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
                        {item.value}
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

export default AddToCartOptions;

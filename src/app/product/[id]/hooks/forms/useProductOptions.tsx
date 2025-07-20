import { useEffect, useRef, useState, useMemo } from "react";
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
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const isInitialized = useRef(false);

  const separatedOptions = useMemo(() => {
    const separated: Record<
      string,
      { value: string; option: ProductOption }[]
    > = {};

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

    return separated;
  }, [productOptions]);

  useEffect(() => {
    if (optionKeys.length > 0 && !isInitialized.current) {
      isInitialized.current = true;
      setOpenDropdowns((prev) => ({
        ...prev,
        [optionKeys[0]]: true,
      }));
    }
  }, [optionKeys]);

  const handleOptionChange = (
    key: string,
    value: string,
    onChange: (opts: Record<string, string>) => void
  ) => {
    const newOptions = { ...watchedOptions, [key]: value };
    onChange(newOptions);

    const currentIndex = optionKeys.indexOf(key);
    const nextKey = optionKeys[currentIndex + 1];

    setOpenDropdowns((prev) => {
      const newState = { ...prev };

      newState[key] = false;

      if (nextKey) {
        const allPreviousSelected = optionKeys
          .slice(0, currentIndex + 1)
          .every(
            (prevKey) => newOptions[prevKey] && newOptions[prevKey] !== ""
          );

        if (allPreviousSelected) {
          newState[nextKey] = true;
        }
      }

      return newState;
    });
  };

  const handleDropdownToggle = (key: string, isOpen: boolean) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: isOpen,
    }));
  };

  return {
    watchedOptions,
    separatedOptions,
    optionKeys,
    openDropdowns,
    handleOptionChange,
    handleDropdownToggle,
  };
}

export default useProductOptions;

import { Control, useController } from "react-hook-form";
import { useEffect } from "react";

interface UseProductQuantityProps {
  control: Control<{ options: Record<string, string>; quantity: number }>;
  max: number;
  onChange?: (quantity: number) => void;
}

function useProductQuantity({
  control,
  max,
  onChange,
}: UseProductQuantityProps) {
  const {
    field: { value: quantity, onChange: fieldOnChange },
  } = useController({
    control,
    name: "quantity",
  });

  useEffect(() => {
    if (max > 0 && quantity > max) {
      fieldOnChange(max);
      onChange?.(max);
    }
  }, [max, quantity, fieldOnChange, onChange]);

  const setQuantity = (next: number, update: (value: number) => void) => {
    if (next < 1 || (max > 0 && next > max)) return;
    update(next);
    onChange?.(next);
  };

  return {
    quantity,
    setQuantity,
  };
}

export { useProductQuantity };

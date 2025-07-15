import { Control, useWatch } from "react-hook-form";

type UseQuantityFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  max: number;
  onChange?: (quantity: number) => void;
};

function useProductQuantity({ control, max, onChange }: UseQuantityFieldProps) {
  const quantity = useWatch({ control, name: "quantity" });

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

export default useProductQuantity;

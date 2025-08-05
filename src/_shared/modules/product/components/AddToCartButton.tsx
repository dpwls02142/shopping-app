import { MouseEventHandler } from "react";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/_shared/components/button";

interface AddToCartButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

function AddToCartButton({
  onClick,
  isDisabled = false,
}: AddToCartButtonProps) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="p-2 h-8 w-8 hover:bg-blue-50 hover:border-blue-200"
      onClick={handleButtonClick}
      aria-label="장바구니에 추가"
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
}

export { AddToCartButton };

import { MouseEventHandler } from "react";

import { ShoppingCart } from "lucide-react";

import { Button } from "@/_shared/components/button";

interface AddToCartButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function AddToCartButton({ onClick }: AddToCartButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="p-2 h-8 w-8 hover:bg-blue-50 hover:border-blue-200"
      onClick={onClick}
      aria-label="장바구니에 추가"
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  );
}

export { AddToCartButton };

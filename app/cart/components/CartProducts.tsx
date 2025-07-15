"use client";

import useCartProductsStore from "@/app/cart/hooks/useCartProductsStore";
import CartProductCard from "./CartProductCard";

type CartProductsProps = {
  onProductRemove?: (itemId: string) => void;
};

export default function CartProducts({ onProductRemove }: CartProductsProps) {
  const { items, removeFromCart } = useCartProductsStore();

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    onProductRemove?.(itemId);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartProductCard key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
}

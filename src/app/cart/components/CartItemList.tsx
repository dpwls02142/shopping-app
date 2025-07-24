"use client";

import { useCartStore } from "@/app/cart/stores/useCartStore";

import { CartItem } from "@/app/cart/components/CartItem";

interface CartItemListProps {
  onProductRemove?: (itemId: string) => void;
}

function CartItemList({ onProductRemove }: CartItemListProps) {
  const { items, removeFromCart } = useCartStore();

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    onProductRemove?.(itemId);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
}

export { CartItemList };

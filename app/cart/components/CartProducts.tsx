"use client";

import useCartProductsStore from "@/app/cart/hooks/useCartProductsStore";
import CartProductCard from "./CartProductCard";

type CartProductsProps = {
  onProductRemove?: (itemId: string) => void;
  onQuantityChange?: (itemId: string, quantity: number) => void;
};

export default function CartProducts({
  onProductRemove,
  onQuantityChange,
}: CartProductsProps) {
  const { items, removeFromCart, updateQuantity } = useCartProductsStore();

  const handleQuantityChange = (itemId: string, quantity: number) => {
    const item = items.find((i) => i.id === itemId);
    try {
      if (item && item.quantity !== quantity) {
        updateQuantity(itemId, quantity, item.productOptions);
        onQuantityChange?.(itemId, quantity);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
    onProductRemove?.(itemId);
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartProductCard
          key={item.id}
          item={item}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

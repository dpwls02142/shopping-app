"use client";

import CartProductCard from "@/app/cart/components/CartItem";
import useCartStore from "@/app/cart/stores/useCartStore";

type CartItemListProps = {
  onProductRemove?: (itemId: string) => void;
};

function CartItemList({ onProductRemove }: CartItemListProps) {
  const { items, removeFromCart } = useCartStore();

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

export default CartItemList;

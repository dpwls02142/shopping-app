"use client";

import CartProductCard from "@/app/cart/components/CartProductCard";
import useCartProductsStore from "@/app/cart/stores/useCartProductsStore";

type CartProductsProps = {
  onProductRemove?: (itemId: string) => void;
};

function CartProducts({ onProductRemove }: CartProductsProps) {
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

export default CartProducts;

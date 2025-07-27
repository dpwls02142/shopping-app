"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { notification } from "@/lib/utils/notification";
import {
  calculateItemPrice,
  createOptionsFromSelection,
  getMaxBuyQuantity,
} from "@/lib/utils/productOptionUtils";
import { CartItem, CartStore } from "@/lib/types/cartType";
import { ProductOption } from "@/lib/types/productType";

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/lib/constants/message";

/**
 * 이미 장바구니에 존재하는 상품인지 확인
 */
function findExistingItemIndex(
  items: CartItem[],
  productId: string,
  selectedOptions: ProductOption[]
): number {
  return items.findIndex((item) => {
    if (item.product.id !== productId) return false;
    if (item.selectedOptions.length !== selectedOptions.length) return false;
    return item.selectedOptions.every((option) =>
      selectedOptions.some((opt) => opt.id === option.id)
    );
  });
}

function updateItem(
  item: CartItem,
  quantity: number,
  discountPrice?: number
): CartItem {
  const totalPrice = calculateItemPrice(
    item.product.basePrice,
    item.selectedOptions,
    quantity,
    discountPrice ?? item.discountPrice
  );

  return {
    ...item,
    quantity,
    discountPrice: discountPrice ?? item.discountPrice,
    totalPrice,
  };
}

function calculateCartSummary(items: CartItem[]) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
  return { totalItems, totalPrice };
}

function findItemIndexById(items: CartItem[], itemId: string) {
  return items.findIndex((item) => item.id === itemId);
}

function handleError(message: string): never {
  notification.error(message);
  throw new Error(message);
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (
        product,
        selectedOptions,
        quantity,
        discountedPrice,
        allAvailableOptions
      ) => {
        if (quantity < 1) {
          handleError(ERROR_MESSAGE.QUANTITY_MINIMUM);
        }

        if (!allAvailableOptions || allAvailableOptions.length === 0) {
          handleError(ERROR_MESSAGE.MISSING_OPTIONS);
        }

        const { items } = get();
        const selectedOption = createOptionsFromSelection(selectedOptions);
        const maxBuyQuantity = getMaxBuyQuantity(
          allAvailableOptions,
          selectedOption
        );

        const existingItemIndex = findExistingItemIndex(
          items,
          product.id,
          selectedOptions
        );

        const updatedItems = [...items];

        if (existingItemIndex !== -1) {
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;

          if (newQuantity > maxBuyQuantity) {
            const remainingQuantity = maxBuyQuantity - existingItem.quantity;
            handleError(
              ERROR_MESSAGE.QUANTITY_EXCEEDED(
                existingItem.quantity,
                remainingQuantity
              )
            );
          }

          updatedItems[existingItemIndex] = updateItem(
            existingItem,
            newQuantity,
            discountedPrice
          );
        } else {
          if (quantity > maxBuyQuantity) {
            handleError(ERROR_MESSAGE.QUANTITY_MAXIMUM(maxBuyQuantity));
          }

          const totalItemPrice = calculateItemPrice(
            product.basePrice,
            selectedOptions,
            quantity,
            discountedPrice
          );

          const newItem: CartItem = {
            id: `${product.id}-${crypto.randomUUID()}`,
            product,
            selectedOptions,
            productOptions: allAvailableOptions,
            quantity,
            totalPrice: totalItemPrice,
            discountPrice: discountedPrice,
            createdAt: new Date().toISOString(),
          };

          updatedItems.push(newItem);
        }
        const { totalItems, totalPrice } = calculateCartSummary(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
        notification.success(SUCCESS_MESSAGE.ADD_TO_CART);
      },

      removeFromCart: (itemId) => {
        const { items } = get();
        const itemIndex = findItemIndexById(items, itemId);
        if (itemIndex === -1) return;
        const updatedItems = items.filter((item) => item.id !== itemId);
        const { totalItems, totalPrice } = calculateCartSummary(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (itemId, quantity, allAvailableOptions) => {
        if (quantity < 1) {
          handleError(ERROR_MESSAGE.QUANTITY_MINIMUM);
        }

        const { items } = get();
        const itemIndex = findItemIndexById(items, itemId);
        if (itemIndex === -1) return;

        const existingItem = items[itemIndex];
        const optionsConfig = createOptionsFromSelection(
          existingItem.selectedOptions
        );
        const maxBuyQuantity = getMaxBuyQuantity(
          allAvailableOptions || [],
          optionsConfig
        );

        if (quantity > maxBuyQuantity) {
          handleError(ERROR_MESSAGE.QUANTITY_MAXIMUM(maxBuyQuantity));
        }

        const updatedItems = items.map((item) =>
          item.id === itemId ? updateItem(item, quantity) : item
        );

        const { totalItems, totalPrice } = calculateCartSummary(updatedItems);
        set({ items: updatedItems, totalItems, totalPrice });
      },

      getItemById: (itemId) => {
        const { items } = get();
        return items.find((item) => item.id === itemId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      }),
    }
  )
);

export { useCartStore };

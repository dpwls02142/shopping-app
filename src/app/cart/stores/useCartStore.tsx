"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  calculateItemPrice,
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";
import { CartItem, CartStore } from "@/lib/types/cartType";
import { Product, ProductOption } from "@/lib/types/productType";

import { ERROR_MESSAGE } from "@/lib/constants/errorMessage";

/**
 * 이미 장바구니에 존재하는 상품인지 확인
 */
const findExistingItemIndex = (
  items: CartItem[],
  productId: string,
  selectedOptions: ProductOption[]
): number => {
  return items.findIndex((item) => {
    if (item.product.id !== productId) return false;
    if (item.selectedOptions.length !== selectedOptions.length) return false;
    return item.selectedOptions.every((option) =>
      selectedOptions.some((opt) => opt.id === option.id)
    );
  });
};

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addToCart: (
        product: Product,
        selectedOptions: ProductOption[],
        quantity: number,
        discountedPrice?: number,
        allAvailableOptions?: ProductOption[]
      ) => {
        if (quantity < 1) {
          throw new Error(ERROR_MESSAGE.QUANTITY_MINIMUM);
        }
        if (!allAvailableOptions || allAvailableOptions.length === 0) {
          throw new Error(ERROR_MESSAGE.MISSING_OPTIONS);
        }

        const { items } = get();
        const selectedOption = createOptionsFromSelection(selectedOptions);
        const maxPurchaseQuantity = getMaxPurchaseQuantity(
          allAvailableOptions,
          selectedOption
        );

        const existingItemIndex = findExistingItemIndex(
          items,
          product.id,
          selectedOptions
        );

        const updatedItems = [...items];

        const existingItemInCart = existingItemIndex !== -1;
        const isNewItem = existingItemIndex === -1;

        if (existingItemInCart) {
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;

          if (newQuantity > maxPurchaseQuantity) {
            const remainingQuantity =
              maxPurchaseQuantity - existingItem.quantity;
            throw new Error(
              ERROR_MESSAGE.QUANTITY_EXCEEDED(
                existingItem.quantity,
                remainingQuantity
              )
            );
          }

          const totalItemPrice = calculateItemPrice(
            product.basePrice,
            selectedOptions,
            newQuantity,
            discountedPrice
          );

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            totalPrice: totalItemPrice,
            discountPrice: discountedPrice,
          };
        }

        if (isNewItem) {
          if (quantity > maxPurchaseQuantity) {
            throw new Error(
              ERROR_MESSAGE.QUANTITY_MAXIMUM(maxPurchaseQuantity)
            );
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
        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      removeFromCart: (itemId: string) => {
        const { items } = get();
        const itemIndex = items.findIndex((item) => item.id === itemId);
        if (itemIndex === -1) return;

        const updatedItems = items.filter((item) => item.id !== itemId);

        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      updateQuantity: (
        itemId: string,
        quantity: number,
        allAvailableOptions?: ProductOption[]
      ) => {
        if (quantity < 1) {
          throw new Error(ERROR_MESSAGE.QUANTITY_MINIMUM);
        }

        const { items } = get();
        const itemIndex = items.findIndex((item) => item.id === itemId);

        if (itemIndex === -1) return;

        const existingItem = items[itemIndex];
        const optionsConfig = createOptionsFromSelection(
          existingItem.selectedOptions
        );
        const maxQuantity = getMaxPurchaseQuantity(
          allAvailableOptions || [],
          optionsConfig
        );

        if (quantity > maxQuantity) {
          throw new Error(ERROR_MESSAGE.QUANTITY_MAXIMUM(maxQuantity));
        }

        const totalItemPrice = calculateItemPrice(
          existingItem.product.basePrice,
          existingItem.selectedOptions,
          quantity,
          existingItem.discountPrice
        );

        const updatedItems = [...items];
        updatedItems[itemIndex] = {
          ...existingItem,
          quantity,
          totalPrice: totalItemPrice,
        };

        const totalItems = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.totalPrice,
          0
        );

        set({ items: updatedItems, totalItems, totalPrice });
      },

      getItemById: (itemId: string) => {
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

"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
  calculateItemPrice,
} from "@/lib/utils/productOptionUtils";
import { CartItem, CartStore } from "@/lib/types/cartType";
import { Product, ProductOption } from "@/lib/types/productType";

const ERROR_MESSAGE = {
  QUANTITY_MINIMUM: `수량은 1개 이상이어야 합니다.`,
  MISSING_OPTIONS: `상품 옵션 정보가 누락되어 장바구니에 추가할 수 없습니다.`,
  QUANTITY_MAXIMUM: (max: number) => `최대 구매 가능 수량은 ${max}개입니다.`,
  QUANTITY_EXCEEDED: (current: number, remaining: number) =>
    `이미 장바구니에 ${current}개가 담겨있습니다. 
  최대 ${remaining}개까지 추가 가능합니다.`,
} as const;

const findExistingItemIndex = (
  items: CartItem[],
  productId: string,
  selectedOptions: ProductOption[]
): number => {
  return items.findIndex((item) => {
    return (
      item.product.id === productId &&
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
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
        const selectedOptionConfig =
          createOptionsFromSelection(selectedOptions);
        const maxPurchaseQuantity = getMaxPurchaseQuantity(
          allAvailableOptions,
          selectedOptionConfig
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
        } else {
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

export default useCartStore;

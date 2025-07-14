"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, CartItem } from "@/lib/types/cartType";
import { Product, ProductOption } from "@/lib/types/productType";
import {
  createOptionsFromSelection,
  getMaxPurchaseQuantity,
} from "@/lib/utils/productOptionUtils";

const useCartProductsStore = create<CartStore>()(
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
        const { items } = get();

        const existingItemIndex = items.findIndex((item) => {
          const isSameProduct = item.product.id === product.id;
          const isSameOptions =
            JSON.stringify(item.selectedOptions) ===
            JSON.stringify(selectedOptions);
          return isSameProduct && isSameOptions;
        });

        if (existingItemIndex !== -1) {
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex];
          const newQuantity = existingItem.quantity + quantity;
          const itemPrice = discountedPrice || product.basePrice;
          const optionPrice = selectedOptions.reduce(
            (sum, option) => sum + option.additionalPrice,
            0
          );
          const totalItemPrice = (itemPrice + optionPrice) * newQuantity;

          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            totalPrice: totalItemPrice,
            discountPrice: discountedPrice,
          };

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems + quantity,
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            ),
          }));
        } else {
          const itemPrice = discountedPrice || product.basePrice;
          const optionPrice = selectedOptions.reduce(
            (sum, option) => sum + option.additionalPrice,
            0
          );
          const totalItemPrice = (itemPrice + optionPrice) * quantity;

          const newItem: CartItem = {
            id: `${product.id}-${Date.now()}-${Math.random()}`,
            product,
            selectedOptions,
            productOptions: allAvailableOptions || [],
            quantity,
            totalPrice: totalItemPrice,
            discountPrice: discountedPrice,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            items: [...state.items, newItem],
            totalItems: state.totalItems + quantity,
            totalPrice: state.totalPrice + totalItemPrice,
          }));
        }
      },

      removeFromCart: (itemId: string) => {
        const { items } = get();
        const itemToRemove = items.find((item) => item.id === itemId);

        if (itemToRemove) {
          const updatedItems = items.filter((item) => item.id !== itemId);

          set((state) => ({
            items: updatedItems,
            totalItems: state.totalItems - itemToRemove.quantity,
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            ),
          }));
        }
      },

      updateQuantity: (
        itemId: string,
        quantity: number,
        allAvailableOptions?: ProductOption[]
      ) => {
        const { items } = get();
        const itemIndex = items.findIndex((item) => item.id === itemId);

        if (itemIndex !== -1) {
          const existingItem = items[itemIndex];

          if (allAvailableOptions && allAvailableOptions.length > 0) {
            const optionsConfig = createOptionsFromSelection(
              existingItem.selectedOptions
            );
            {
              const maxQuantity = getMaxPurchaseQuantity(
                allAvailableOptions,
                optionsConfig
              );
              if (quantity > maxQuantity) {
                throw new Error(
                  `최대 구매 가능 수량은 ${maxQuantity}개입니다.`
                );
              }
            }
          }

          const updatedItems = [...items];
          const itemPrice =
            existingItem.discountPrice || existingItem.product.basePrice;
          const optionPrice = existingItem.selectedOptions.reduce(
            (sum, option) => sum + option.additionalPrice,
            0
          );
          const totalItemPrice = (itemPrice + optionPrice) * quantity;

          updatedItems[itemIndex] = {
            ...existingItem,
            quantity,
            totalPrice: totalItemPrice,
          };

          set((_state) => ({
            items: updatedItems,
            totalItems: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
            totalPrice: updatedItems.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            ),
          }));
        }
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

export default useCartProductsStore;

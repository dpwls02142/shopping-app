import { Product, ProductOption } from "./productType";

export type CartItem = {
  id: string;
  product: Product;
  selectedOptions: ProductOption[];
  quantity: number;
  totalPrice: number;
  createdAt: string;
};

export type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

export type CartActions = {
  addToCart: (
    product: Product,
    selectedOptions: ProductOption[],
    quantity: number,
    discountedPrice?: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemById: (itemId: string) => CartItem | undefined;
};

export type CartStore = CartState & CartActions;

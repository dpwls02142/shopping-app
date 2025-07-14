import { Product, ProductOption } from "@/lib/types/productType";

export type CartItem = {
  id: string;
  product: Product;
  selectedOptions: ProductOption[];
  productOptions: ProductOption[];
  quantity: number;
  totalPrice: number;
  discountPrice?: number;
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
    discountedPrice?: number,
    allAvailableOptions?: ProductOption[]
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (
    itemId: string,
    quantity: number,
    allAvailableOptions?: ProductOption[]
  ) => void;
  getItemById: (itemId: string) => CartItem | undefined;
};

export type CartStore = CartState & CartActions;

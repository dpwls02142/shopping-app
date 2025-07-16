import { Product, ProductOption } from "@/lib/types/productType";

type CartItem = {
  id: string;
  product: Product;
  selectedOptions: ProductOption[];
  productOptions: ProductOption[];
  quantity: number;
  totalPrice: number;
  discountPrice?: number;
  createdAt: string;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartActions = {
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

type CartStore = CartState & CartActions;

export type { CartActions, CartItem, CartState,CartStore };

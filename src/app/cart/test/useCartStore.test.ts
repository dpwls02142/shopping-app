import { describe, it, expect, beforeEach, vi } from "vitest";
import useCartStore from "@/app/cart/stores/useCartStore";

const mockUuid = "test-uuid-123";
vi.stubGlobal("crypto", {
  randomUUID: () => mockUuid,
});

const mockProduct = {
  id: "1",
  name: "테스트 상품",
  basePrice: 10000,
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  sellerId: "seller1",
};

const mockOptions = [
  {
    id: "option1",
    productId: "1",
    optionName: "색상",
    optionValue: "빨강",
    additionalPrice: 0,
    stockQuantity: 10,
    maxPurchaseQuantity: 10,
  },
  {
    id: "option2",
    productId: "1",
    optionName: "사이즈",
    optionValue: "M",
    additionalPrice: 0,
    stockQuantity: 5,
    maxPurchaseQuantity: 5,
  },
];

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    });
  });
});

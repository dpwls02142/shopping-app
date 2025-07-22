import { beforeEach, describe, expect, it, vi } from "vitest";

import useCartStore from "@/app/cart/stores/useCartStore";

let uuidCounter = 0;
vi.stubGlobal("crypto", {
  randomUUID: () => `test-uuid-${++uuidCounter}`,
});

const mockProduct = {
  id: "1",
  name: "테스트 상품",
  basePrice: 10000,
  isActive: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
  sellerId: "seller1",
};

const mockOptions = [
  {
    id: "option1",
    productId: "1",
    optionName: "색상",
    optionValue: '{"색상":"빨강"}',
    additionalPrice: 0,
    stockQuantity: 10,
    maxPurchaseQuantity: 10,
  },
  {
    id: "option2",
    productId: "1",
    optionName: "사이즈",
    optionValue: '{"사이즈":"M"}',
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
  describe("시나리오 1", () => {
    it("여러 상품을 추가하고 수정하는 전체 플로우가 올바르게 동작해야 한다", () => {
      const store = useCartStore.getState();

      // 상품들 추가
      store.addToCart(mockProduct, [mockOptions[0]], 2, undefined, mockOptions);
      store.addToCart(mockProduct, [mockOptions[1]], 1, undefined, mockOptions);

      let state = useCartStore.getState();
      expect(state.items).toHaveLength(2);
      expect(state.totalItems).toBe(3);
      expect(state.totalPrice).toBe(30000);

      // 첫 번째 상품 수량 변경
      const firstItemId = state.items[0].id;
      store.updateQuantity(firstItemId, 1, mockOptions);

      state = useCartStore.getState();
      expect(state.items).toHaveLength(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(20000);

      // 두 번째 상품 제거
      const secondItemId = state.items[1].id;
      store.removeFromCart(secondItemId);

      state = useCartStore.getState();
      expect(state.items).toHaveLength(1);
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(10000);
    });
  });
});

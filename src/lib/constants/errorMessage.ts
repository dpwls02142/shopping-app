const ERROR_MESSAGE = {
  QUANTITY_MINIMUM: `수량은 1개 이상이어야 합니다.`,
  MISSING_OPTIONS: `상품 옵션 정보가 누락되었습니다. 옵션을 모두 선택해주세요.`,
  QUANTITY_MAXIMUM: (max: number) => `최대 구매 가능 수량은 ${max}개입니다.`,
  QUANTITY_EXCEEDED: (current: number, remaining: number) =>
    `이미 장바구니에 ${current}개가 담겨있습니다. 최대 ${remaining}개까지 추가 가능합니다.`,
} as const;

export { ERROR_MESSAGE };

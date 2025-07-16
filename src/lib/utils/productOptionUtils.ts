import {
  ProductDetailInfo,
  ProductOption,
  ProductPreviewInfo,
} from "@/lib/types/productType";

/**
 * ProductOption의 optionValue를 Record<string, string> 형태로 반환
 */
const safelyParseOptionValue = (
  option: ProductOption
): Record<string, string> => {
  try {
    const parsed = JSON.parse(option.optionValue);
    if (typeof parsed === "object" && parsed !== null) {
      return Object.entries(parsed).reduce(
        (acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>
      );
    }
  } catch (error) {
    console.error(error);
  }
  return { [option.optionName]: option.optionValue };
};

/**
 * 옵션에서 모든 고유 키를 추출합니다.
 */
const extractOptionKeys = (options: ProductOption[]): string[] => {
  if (!options || options.length === 0) return [];
  // flatMap으로 모든 키를 배열로 펼친 후 Set을 사용해 중복을 제거
  const allKeys = options.flatMap((option) =>
    Object.keys(safelyParseOptionValue(option))
  );
  return [...new Set(allKeys)];
};

/**
 * 선택된 옵션 조합에 해당하는 ProductOption 찾기
 */
const findMatchingOption = (
  options: ProductOption[],
  selectedOptions: Record<string, string>
): ProductOption | null => {
  const validSelected = Object.fromEntries(
    Object.entries(selectedOptions).filter(([_, value]) => value?.trim())
  );

  if (Object.keys(validSelected).length === 0) return null;

  return (
    options.find((option) => {
      const parsedOption = safelyParseOptionValue(option);
      return Object.entries(validSelected).every(
        ([key, value]) => parsedOption[key] === value
      );
    }) || null
  );
};

/**
 * 선택된 옵션들로부터 하나의 옵션 설정 객체(Record)를 생성
 */
const createOptionsFromSelection = (
  selectedOptions: ProductOption[]
): Record<string, string> => {
  // reduce를 사용하여 모든 옵션을 하나의 객체로 병합
  return selectedOptions.reduce(
    (acc, option) => ({
      ...acc,
      ...safelyParseOptionValue(option),
    }),
    {}
  );
};

/**
 * 최대 구매 가능 수량
 */
const getMaxPurchaseQuantity = (
  options: ProductOption[],
  selectedOptions: Record<string, string>
): number => {
  const matchingOption = findMatchingOption(options, selectedOptions);
  return matchingOption?.maxPurchaseQuantity ?? 0;
};

/**
 * 모든 필수 옵션이 선택되었는지 확인
 */
const areAllOptionsSelected = (
  optionKeys: string[],
  selectedOptions: Record<string, string>
): boolean => {
  return optionKeys.every((key) => selectedOptions[key]?.trim());
};

/**
 * 옵션 객체를 키-값 쌍의 배열로 변환
 */
const convertRecordToKeyValueArray = (
  options: Record<string, string>
): Array<{ key: string; value: string }> => {
  return Object.entries(options)
    .filter(([_, value]) => value?.trim())
    .map(([key, value]) => ({ key, value }));
};

function toProductPreview(
  productDetail: ProductDetailInfo
): ProductPreviewInfo {
  const { product, discount, thumbnailImage, reviewCount, averageRating } =
    productDetail;

  return {
    id: product.id,
    name: product.name,
    basePrice: product.basePrice,
    discountedPrice: discount?.discountedPrice,
    discountRate: discount?.discountRate,
    discountType: discount?.discountType,
    thumbnailImage: thumbnailImage,
    reviewCount: reviewCount ?? 0,
    averageRating: averageRating ?? 0,
  };
}

export {
  areAllOptionsSelected,
  convertRecordToKeyValueArray,
  createOptionsFromSelection,
  extractOptionKeys,
  findMatchingOption,
  getMaxPurchaseQuantity,
  safelyParseOptionValue,
  toProductPreview,
};

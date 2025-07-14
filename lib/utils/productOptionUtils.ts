import { ProductOption } from "@/lib/types/productType";

/**
옵션에서 모든 키를 추출하는 함수
*/
export const extractOptionKeys = (options: ProductOption[]): string[] => {
  if (!options || options.length === 0) return [];

  const keys: string[] = [];
  options.forEach((option) => {
    try {
      const parsedOptions = JSON.parse(option.optionValue);
      if (typeof parsedOptions === "object" && parsedOptions !== null) {
        Object.keys(parsedOptions).forEach((key) => {
          if (!keys.includes(key)) {
            keys.push(key);
          }
        });
      }
    } catch (error) {
      if (!keys.includes(option.optionName)) {
        keys.push(option.optionName);
      }
    }
  });
  return keys;
};

/**
JSON 문자열로 저장된 옵션 값을 파싱해서 보기 좋게 표시하는 함수
*/
export const parseOptionValue = (optionValue: string): string => {
  try {
    const parsedValue = JSON.parse(optionValue);

    // 객체인 경우 값들을 " / "로 연결해서 반환
    if (typeof parsedValue === "object" && parsedValue !== null) {
      return Object.values(parsedValue).join(" / ");
    }

    // 문자열인 경우 그대로 반환
    return String(parsedValue);
  } catch (error) {
    // JSON 파싱에 실패하면 원본 값 반환
    return optionValue;
  }
};

/**
선택된 옵션 조합에 해당하는 실제 ProductOption 찾기
*/
export const findMatchingOption = (
  options: ProductOption[],
  selectedOptions: Record<string, string>
): ProductOption | null => {
  return (
    options.find((option) => {
      try {
        const parsedValue = JSON.parse(option.optionValue);

        if (typeof parsedValue === "object" && parsedValue !== null) {
          // 모든 선택된 옵션과 일치하는지 확인
          return Object.keys(selectedOptions).every((key) => {
            return parsedValue[key] === selectedOptions[key];
          });
        }

        return false;
      } catch (error) {
        return false;
      }
    }) || null
  );
};

/**
최대 구매 가능 수량 가져오기
*/
export const getMaxPurchaseQuantity = (
  options: ProductOption[],
  selectedOptions: Record<string, string>
): number => {
  const matchingOption = findMatchingOption(options, selectedOptions);
  return matchingOption ? matchingOption.maxPurchaseQuantity : 0;
};

/**
수량 유효성 검사
*/
export const validateQuantity = (
  options: ProductOption[],
  selectedOptions: Record<string, string>,
  quantity: number
): boolean => {
  const maxQuantity = getMaxPurchaseQuantity(options, selectedOptions);
  return quantity > 0 && quantity <= maxQuantity;
};

/**
모든 필수 옵션이 선택되었는지 확인
*/
export const areAllOptionsSelected = (
  optionKeys: string[],
  selectedOptions: Record<string, string>
): boolean => {
  return optionKeys.every(
    (key) => selectedOptions[key] && selectedOptions[key] !== ""
  );
};

/**
선택된 옵션으로부터 옵션 설정 객체 생성
*/
export const createOptionsFromSelection = (
  selectedOptions: ProductOption[]
): Record<string, string> => {
  const result: Record<string, string> = {};

  selectedOptions.forEach((option) => {
    try {
      const parsedValue = JSON.parse(option.optionValue);

      if (typeof parsedValue === "object" && parsedValue !== null) {
        Object.keys(parsedValue).forEach((key) => {
          result[key] = parsedValue[key];
        });
      } else {
        result[option.optionName] = option.optionValue;
      }
    } catch (error) {
      result[option.optionName] = option.optionValue;
    }
  });

  return result;
};

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
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
  // 빈 문자열이나 유효하지 않은 값들을 필터링
  const validSelectedOptions = Object.fromEntries(
    Object.entries(selectedOptions).filter(
      ([_, value]) => value && value.trim() !== ""
    )
  );

  if (Object.keys(validSelectedOptions).length === 0) {
    return null;
  }

  for (const option of options) {
    try {
      const parsedValue = JSON.parse(option.optionValue);

      if (typeof parsedValue === "object" && parsedValue !== null) {
        const selectedKeys = Object.keys(validSelectedOptions);
        const parsedKeys = Object.keys(parsedValue);

        const isMatch = selectedKeys.every((key) => {
          const hasKey = parsedKeys.includes(key);
          const valueMatch = parsedValue[key] === validSelectedOptions[key];

          return hasKey && valueMatch;
        });

        if (isMatch) {
          return option;
        }
      }
    } catch (error) {
      // JSON 파싱 실패 시 단순 문자열로 처리
      const optionKey = option.optionName;
      if (validSelectedOptions[optionKey] === option.optionValue) {
        return option;
      }
    }
  }

  return null;
};

/**
최대 구매 가능 수량 가져오기
*/
export const getMaxPurchaseQuantity = (
  options: ProductOption[],
  selectedOptions: Record<string, string>
): number => {
  const matchingOption = findMatchingOption(options, selectedOptions);

  if (
    matchingOption &&
    typeof matchingOption.maxPurchaseQuantity === "number"
  ) {
    return matchingOption.maxPurchaseQuantity;
  }

  return 2;
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      result[option.optionName] = option.optionValue;
    }
  });

  return result;
};

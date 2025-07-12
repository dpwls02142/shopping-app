export const SERVER_BASE_URL = "http://localhost:3001";

export const formatPriceToKor = (price: number) => {
  return price.toLocaleString("ko-KR");
};

export const handleApiError = (error: any, defaultValue: any = null) => {
  console.error(error);
  return defaultValue;
};

export const fetchWithErrorHandling = async <T>(
  url: string,
  errorMessage: string,
  defaultValue: T
): Promise<T> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${errorMessage}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, defaultValue);
  }
};
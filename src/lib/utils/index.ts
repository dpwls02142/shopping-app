import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getApiUrl = (endpoint: string) => {
  // 서버 측
  if (typeof window === "undefined") {
    const apiBaseUrl = "http://localhost:3001";
    if (apiBaseUrl) {
      return `${apiBaseUrl}/${endpoint}`;
    }
  }
  // 클라이언트 측에선 상대 경로
  return `http://localhost:3001/${endpoint}`;
};

const formatPriceToKor = (price: number) => {
  return price.toLocaleString("ko-KR");
};

const formatDateToKor = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handleApiError = <T>(error: unknown, defaultValue: T): T => {
  console.error(error);
  return defaultValue;
};

const fetchWithErrorHandling = async <T>(
  url: string,
  errorMessage: string,
  defaultValue: T,
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

export {
  fetchWithErrorHandling,
  formatDateToKor,
  formatPriceToKor,
  getApiUrl,
  handleApiError,
};

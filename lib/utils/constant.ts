export const getApiUrl = (endpoint: string) => {
  if (typeof window === "undefined") {
    console.log("Server side environment:");
    console.log("VERCEL_URL:", process.env.VERCEL_URL);
    console.log("VERCEL_ENV:", process.env.VERCEL_ENV);
    console.log("API_BASE_URL:", process.env.API_BASE_URL);

    // 서버 사이드
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}/api/${endpoint}`;
    }
    return `${process.env.API_BASE_URL || "http://localhost:3000"}/api/${endpoint}`;
  }

  // 클라이언트 사이드
  return `${process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin}/api/${endpoint}`;
};

export const formatPriceToKor = (price: number) => {
  return price.toLocaleString("ko-KR");
};

export const formatDateToKor = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const handleApiError = <T>(error: unknown, defaultValue: T): T => {
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

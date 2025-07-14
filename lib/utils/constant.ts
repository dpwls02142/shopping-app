export const getApiUrl = (endpoint: string) => {
  if (typeof window === "undefined") {
    const vercelUrl = process.env.VERCEL_URL;
    const apiBaseUrl = process.env.API_BASE_URL;

    if (vercelUrl) {
      return `https://${vercelUrl}/api/${endpoint}`;
    }
    if (apiBaseUrl) {
      return `${apiBaseUrl}/api/${endpoint}`;
    }
    return `http://localhost:3000/api/${endpoint}`;
  }
  return `/api/${endpoint}`;
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

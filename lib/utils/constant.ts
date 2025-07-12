export const SERVER_BASE_URL = "http://localhost:3001";

export const formatPriceToKor = (price: number) => {
  return price.toLocaleString("ko-KR");
};

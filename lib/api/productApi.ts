import {
  Product,
  ProductInventory,
  ProductOption,
  ProductDiscount,
  ProductImage,
  Seller,
  Review,
  ProductPreviewInfo,
} from "../types/productType";
import { SERVER_BASE_URL } from "../utils/constant";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/products`);
  return response.json();
};

export const fetchProductInventories = async (): Promise<
  ProductInventory[]
> => {
  const response = await fetch(`${SERVER_BASE_URL}/productInventories`);
  return response.json();
};

export const fetchProductOptions = async (): Promise<ProductOption[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/productOptions`);
  return response.json();
};

export const fetchProductDiscounts = async (): Promise<ProductDiscount[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/productDiscounts`);
  return response.json();
};

export const fetchProductImages = async (): Promise<ProductImage[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/productImages`);
  return response.json();
};

export const fetchSellers = async (): Promise<Seller[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/sellers`);
  return response.json();
};

export const fetchProductReviews = async (): Promise<Review[]> => {
  const response = await fetch(`${SERVER_BASE_URL}/reviews`);
  return response.json();
};

export const fetchProductPreviewInfo = async (): Promise<
  ProductPreviewInfo[]
> => {
  try {
    const [products, discounts, images, reviews] = await Promise.all([
      fetchProducts(),
      fetchProductDiscounts(),
      fetchProductImages(),
      fetchProductReviews(),
    ]);

    return products.map((product) => {
      const discount = discounts.find((disc) => disc.productId === product.id);
      const thumbnailImage = images.find(
        (img) => img.productId === product.id && img.imageType === "thumbnail"
      )?.imageUrl;

      const productReviews = reviews.filter(
        (review) => review.productId === product.id
      );

      const reviewCount = productReviews.length;
      const averageRating =
        reviewCount > 0
          ? productReviews.reduce(
              (sum, review) => sum + review.reviewScore,
              0
            ) / reviewCount
          : 0;

      return {
        id: product.id,
        name: product.name,
        basePrice: product.basePrice,
        discountedPrice: discount?.discountedPrice,
        discountRate: discount?.discountRate,
        discountType: discount?.discountType,
        thumbnailImage,
        reviewCount,
        averageRating: Math.round(averageRating * 10) / 10,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

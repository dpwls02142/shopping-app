import {
  Product,
  ProductDiscount,
  ProductImage,
  Review,
  Seller,
  ProductDetailInfo,
  ProductOption,
} from "../types/productType";
import { SERVER_BASE_URL, handleApiError } from "@/lib/utils/constant";

export const fetchProductByProductId = async (
  productId: string
): Promise<Product> => {
  const response = await fetch(`${SERVER_BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchProductDiscountByProductId = async (
  productId: string
): Promise<ProductDiscount | null> => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/productDiscounts?productId=${productId}`
    );
    if (!response.ok) {
      console.warn("No discount found for product", productId);
      return null;
    }
    const discounts: ProductDiscount[] = await response.json();
    return discounts[0] ?? null;
  } catch (error) {
    return handleApiError(error, null);
  }
};

export const fetchProductImageByProductId = async (
  productId: string
): Promise<ProductImage[]> => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/productImages?productId=${productId}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch product images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, []);
  }
};

export const fetchProductReviewByProductId = async (
  productId: string
): Promise<Review[]> => {
  try {
    const response = await fetch(
      `${SERVER_BASE_URL}/reviews?productId=${productId}`
    );
    if (!response.ok) {
      return [];
    }
    return await response.json();
  } catch (error) {
    return handleApiError(error, []);
  }
};

export const fetchProductOptionsByProductId = async (
  productId: string
): Promise<ProductOption[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/productOptions`);
    if (!response.ok) {
      return [];
    }
    const allOptions = await response.json();
    const filteredOptions = allOptions.filter(
      (option: ProductOption) => option.productId === productId
    );

    return filteredOptions;
  } catch (error) {
    return handleApiError(error, []);
  }
};

export const fetchSellerById = async (sellerId: string): Promise<Seller> => {
  const response = await fetch(`${SERVER_BASE_URL}/sellers/${sellerId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch seller: ${response.statusText}`);
  }
  return await response.json();
};

export const fetchProductDetail = async (
  productId: string
): Promise<ProductDetailInfo> => {
  try {
    const product = await fetchProductByProductId(productId);

    const [seller, discount, images, reviews, options] = await Promise.all([
      fetchSellerById(product.sellerId),
      fetchProductDiscountByProductId(productId),
      fetchProductImageByProductId(productId),
      fetchProductReviewByProductId(productId),
      fetchProductOptionsByProductId(productId),
    ]);

    const thumbnailImage = images.find(
      (img) => img.imageType === "thumbnail"
    )?.imageUrl;
    const detailImages = images
      .filter((img) => img.imageType === "detail")
      .map((img) => img.imageUrl);

    const reviewCount = reviews.length;
    const averageRating =
      reviewCount > 0
        ? Math.round(
            (reviews.reduce((sum, r) => sum + r.reviewScore, 0) / reviewCount) *
              10
          ) / 10
        : 0;

    return {
      product,
      seller,
      discount: discount ?? undefined,
      thumbnailImage,
      detailImages,
      reviews,
      reviewCount,
      averageRating,
      options,
    };
  } catch (error) {
    console.error("fetchProductDetail error:", error);
    throw error;
  }
};

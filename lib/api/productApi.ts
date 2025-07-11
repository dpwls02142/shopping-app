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
  try {
    const response = await fetch(`${SERVER_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductInventories = async (): Promise<
  ProductInventory[]
> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/productInventories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product inventories: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductOptions = async (): Promise<ProductOption[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/productOptions`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product options: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductDiscounts = async (): Promise<ProductDiscount[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/productDiscounts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product discounts: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductImages = async (): Promise<ProductImage[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/productImages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product images: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSellers = async (): Promise<Seller[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/sellers`);
    if (!response.ok) {
      throw new Error(`Failed to fetch sellers: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductReviews = async (): Promise<Review[]> => {
  try {
    const response = await fetch(`${SERVER_BASE_URL}/reviews`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product reviews: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
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
    const discountsMap = new Map(discounts.map((d) => [d.productId, d]));
    const imagesMap = new Map(
      images
        .filter((img) => img.imageType === "thumbnail")
        .map((img) => [img.productId, img.imageUrl])
    );
    const reviewsPreview = new Map<string, { sum: number; count: number }>();
    reviews.forEach((review) => {
      const existing = reviewsPreview.get(review.productId) ?? {
        sum: 0,
        count: 0,
      };
      reviewsPreview.set(review.productId, {
        sum: existing.sum + review.reviewScore,
        count: existing.count + 1,
      });
    });

    return products.map((product) => {
      const discount = discountsMap.get(product.id);
      const reviewInfo = reviewsPreview.get(product.id);
      const reviewCount = reviewInfo?.count ?? 0;
      const averageRating = reviewCount > 0 ? reviewInfo!.sum / reviewCount : 0;

      return {
        id: product.id,
        name: product.name,
        basePrice: product.basePrice,
        discountedPrice: discount?.discountedPrice,
        discountRate: discount?.discountRate,
        discountType: discount?.discountType,
        thumbnailImage: imagesMap.get(product.id),
        reviewCount,
        averageRating: Math.round(averageRating * 10) / 10,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

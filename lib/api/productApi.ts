import {
  Product,
  ProductInventory,
  ProductOption,
  ProductDiscount,
  ProductImage,
  Seller,
  Review,
  ProductPreviewInfo,
  ProductDetailInfo,
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
      throw new Error(
        `Failed to fetch product inventories: ${response.statusText}`
      );
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
      throw new Error(
        `Failed to fetch product options: ${response.statusText}`
      );
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
      throw new Error(
        `Failed to fetch product discounts: ${response.statusText}`
      );
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
      throw new Error(
        `Failed to fetch product reviews: ${response.statusText}`
      );
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
    const productDiscounts = new Map(discounts.map((d) => [d.productId, d]));
    const productThumbnail = new Map(
      images
        .filter((img) => img.imageType === "thumbnail")
        .map((img) => [img.productId, img.imageUrl])
    );
    const productReviewsPreview = new Map<
      string,
      { sum: number; count: number }
    >();
    reviews.forEach((review) => {
      const existing = productReviewsPreview.get(review.productId) ?? {
        sum: 0,
        count: 0,
      };
      productReviewsPreview.set(review.productId, {
        sum: existing.sum + review.reviewScore,
        count: existing.count + 1,
      });
    });

    return products.map((product) => {
      const discount = productDiscounts.get(product.id);
      const reviewInfo = productReviewsPreview.get(product.id);
      const reviewCount = reviewInfo?.count ?? 0;
      const averageRating = reviewCount > 0 ? reviewInfo!.sum / reviewCount : 0;

      return {
        id: product.id,
        name: product.name,
        basePrice: product.basePrice,
        discountedPrice: discount?.discountedPrice,
        discountRate: discount?.discountRate,
        discountType: discount?.discountType,
        thumbnailImage: productThumbnail.get(product.id),
        reviewCount,
        averageRating: Math.round(averageRating * 10) / 10,
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchProductDetail = async (
  productId: string
): Promise<ProductDetailInfo> => {
  try {
    const [products, discounts, images, reviews] = await Promise.all([
      fetchProducts(),
      fetchProductDiscounts(),
      fetchProductImages(),
      fetchProductReviews(),
    ]);

    const product = products.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Failed to fetch product: ${productId}`);
    }

    const discount = discounts.find((d) => d.productId === productId);
    const productImages = images.filter((img) => img.productId === productId);
    const thumbnailImage = productImages.find(
      (img) => img.imageType === "thumbnail"
    )?.imageUrl;
    const detailImages = productImages
      .filter((img) => img.imageType === "detail")
      .map((img) => img.imageUrl);

    const productReviews = reviews.filter((r) => r.productId === productId);
    const reviewCount = productReviews.length;
    const averageRating =
      reviewCount > 0
        ? Math.round(
            (productReviews.reduce((sum, r) => sum + r.reviewScore, 0) /
              reviewCount) *
              10
          ) / 10
        : 0;

    return {
      product,
      discount,
      thumbnailImage,
      detailImages,
      reviews: productReviews,
      reviewCount,
      averageRating,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

import {
  Product,
  ProductDetailInfo,
  ProductDiscount,
  ProductImage,
  ProductInventory,
  ProductOption,
  ProductPreviewInfo,
  Review,
  Seller,
} from "../types/productType";
import { fetchWithErrorHandling, getApiUrl, handleApiError } from "../utils/constant";

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchWithErrorHandling(
    getApiUrl("products"),
    "Failed to fetch products",
    []
  );
};

export const fetchProductInventories = async (): Promise<
  ProductInventory[]
> => {
  return fetchWithErrorHandling(
    getApiUrl("productInventories"),
    "Failed to fetch product inventories",
    []
  );
};

export const fetchProductOptions = async (): Promise<ProductOption[]> => {
  return fetchWithErrorHandling(
    getApiUrl("productOptions"),
    "Failed to fetch product options",
    []
  );
};

export const fetchProductDiscounts = async (): Promise<ProductDiscount[]> => {
  return fetchWithErrorHandling(
    getApiUrl("productDiscounts"),
    "Failed to fetch product discounts",
    []
  );
};

export const fetchProductImages = async (): Promise<ProductImage[]> => {
  return fetchWithErrorHandling(
    getApiUrl("productImages"),
    "Failed to fetch product images",
    []
  );
};

export const fetchSellers = async (): Promise<Seller[]> => {
  return fetchWithErrorHandling(
    getApiUrl("sellers"),
    "Failed to fetch sellers",
    []
  );
};

export const fetchProductReviews = async (): Promise<Review[]> => {
  return fetchWithErrorHandling(
    getApiUrl("productReviews"),
    "Failed to fetch product reviews",
    []
  );
};

export const fetchAllProductsWithDetails = async (): Promise<
  ProductDetailInfo[]
> => {
  try {
    const [products, discounts, images, reviews, sellers, options] =
      await Promise.all([
        fetchProducts(),
        fetchProductDiscounts(),
        fetchProductImages(),
        fetchProductReviews(),
        fetchSellers(),
        fetchProductOptions(),
      ]);

    const productDiscounts = new Map(discounts.map((d) => [d.productId, d]));
    const sellersMap = new Map(sellers.map((s) => [s.id, s]));
    const productImagesByProduct = new Map<
      string,
      { thumbnail?: string; details: string[] }
    >();

    images.forEach((img) => {
      if (!productImagesByProduct.has(img.productId)) {
        productImagesByProduct.set(img.productId, { details: [] });
      }
      const entry = productImagesByProduct.get(img.productId)!;
      if (img.imageType === "thumbnail") {
        entry.thumbnail = img.imageUrl;
      } else if (img.imageType === "detail") {
        entry.details.push(img.imageUrl);
      }
    });

    const productReviewsByProduct = new Map<string, Review[]>();
    reviews.forEach((review) => {
      if (!productReviewsByProduct.has(review.productId)) {
        productReviewsByProduct.set(review.productId, []);
      }
      productReviewsByProduct.get(review.productId)!.push(review);
    });

    const productOptionsByProduct = new Map<string, ProductOption[]>();
    options.forEach((option) => {
      if (!productOptionsByProduct.has(option.productId)) {
        productOptionsByProduct.set(option.productId, []);
      }
      productOptionsByProduct.get(option.productId)!.push(option);
    });

    const processedProducts = products
      .map((product): ProductDetailInfo | null => {
        const seller = sellersMap.get(product.sellerId);
        if (!seller) return null;

        const discount = productDiscounts.get(product.id);
        const imageInfo = productImagesByProduct.get(product.id);
        const productReviews = productReviewsByProduct.get(product.id) || [];
        const productOptions = productOptionsByProduct.get(product.id) || [];
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
          options: productOptions,
          seller,
          discount,
          thumbnailImage: imageInfo?.thumbnail,
          detailImages: imageInfo?.details || [],
          reviews: productReviews || [],
          reviewCount: reviewCount || 0,
          averageRating: averageRating || 0,
        };
      })
      .filter((p): p is ProductDetailInfo => p !== null);

    return processedProducts;
  } catch (error) {
    return handleApiError(error, []);
  }
};

export const fetchProductPreviewInfo = async (): Promise<
  ProductPreviewInfo[]
> => {
  try {
    const allProducts = await fetchAllProductsWithDetails();
    return allProducts.map((p) => ({
      id: p.product.id,
      name: p.product.name,
      basePrice: p.product.basePrice,
      discountedPrice: p.discount?.discountedPrice,
      discountRate: p.discount?.discountRate,
      discountType: p.discount?.discountType,
      thumbnailImage: p.thumbnailImage,
      reviewCount: p.reviewCount ?? 0,
      averageRating: p.averageRating ?? 0,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export type Product = {
  id: string;
  sellerId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductInventory = {
  id: string;
  productId: string;
  currentStock: number;
  lastUpdated: string;
};

export type ProductOption = {
  id: string;
  productId: string;
  optionName: string;
  optionValue: string;
  additionalPrice: number;
  stockQuantity: number;
};

export type ProductDiscount = {
  id: string;
  productId: string;
  discountType: "daily_deal" | "brand_deal" | "sale";
  discountRate: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
};

export type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  imageType: "thumbnail" | "detail";
};

export type Seller = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  customerId: string;
  productId: string;
  reviewDetail: string;
  imageUrl: string;
  reviewScore: number;
  createdAt: string;
  reviewFavorite: number;
};

export type ProductPreviewInfo = {
  id: string;
  name: string;
  basePrice: number;
  discountedPrice?: number;
  discountRate?: number;
  discountType?: "daily_deal" | "brand_deal" | "sale";
  thumbnailImage?: string;
  reviewCount: number;
  averageRating: number;
};

export type ProductDetailInfo = {
  product: Product;
  seller: Seller;
  discount?: ProductDiscount;
  thumbnailImage?: string;
  detailImages: string[];
  reviews?: Review[];
  reviewCount?: number;
  averageRating?: number;
};

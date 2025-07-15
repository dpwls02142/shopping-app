type Product = {
  id: string;
  sellerId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type ProductInventory = {
  id: string;
  productId: string;
  currentStock: number;
  lastUpdated: string;
};

type ProductOption = {
  id: string;
  productId: string;
  optionName: string;
  optionValue: string;
  additionalPrice: number;
  stockQuantity: number;
  maxPurchaseQuantity: number;
};

type ProductDiscount = {
  id: string;
  productId: string;
  discountType: "daily_deal" | "brand_deal" | "sale";
  discountRate: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
};

type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  imageType: "thumbnail" | "detail";
};

type Seller = {
  id: string;
  name: string;
};

type Review = {
  id: string;
  customerId: string;
  productId: string;
  reviewDetail: string;
  imageUrl: string;
  reviewScore: number;
  createdAt: string;
  reviewFavorite: number;
};

type ProductPreviewInfo = {
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

type ProductDetailInfo = {
  product: Product;
  options: ProductOption[];
  seller: Seller;
  discount?: ProductDiscount;
  thumbnailImage?: string;
  detailImages: string[];
  reviews?: Review[];
  reviewCount?: number;
  averageRating?: number;
};

export type {
  Product,
  ProductDetailInfo,
  ProductDiscount,
  ProductImage,
  ProductInventory,
  ProductOption,
  ProductPreviewInfo,
  Review,
  Seller,
};

export type Product = {
  id: string;
  sellerId: string;
  name: string;
  basePrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProductInventory = {
  id: string;
  productId: string;
  currentStock: number;
  lastUpdated: string;
}

export type ProductOption = {
  id: string;
  productId: string;
  optionName: string;
  optionValue: string;
  additionalPrice: number;
  stockQuantity: number;
}

export type ProductDiscount = {
  id: string;
  productId: string;
  discountType: "daily_deal" | "brand_deal" | "sale";
  discountRate: number;
  discountedPrice: number;
  startDate: string;
  endDate: string;
}

export type ProductImage = {
  id: string;
  productId: string;
  imageUrl: string;
  imageType: "thumbnail" | "detail";
}

export type Seller = {
  id: string;
  name: string;
}

export type CombinedProduct = {
  id: string;
  name: string;
  basePrice: number;
  discountedPrice?: number;
  discountRate?: number;
  discountType?: string;
  isActive: boolean;
  currentStock: number;
  thumbnailImage?: string;
  detailImages: string[];
  options: ProductOption[];
  seller: Seller;
  createdAt: string;
  updatedAt: string;
}

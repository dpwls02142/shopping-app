"use client";

import { cn } from "@/lib/utils";
import { toProductPreview } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import DealTimer from "@/app/product/(deal)/components/DealTimer";
import ProductImage from "@/app/product/components/ProductImage";
import ProductPrice from "@/app/product/components/ProductPrice";
import ProductRating from "@/app/product/components/ProductRating";
import { FLEX_ITEMS_START_BETWEEN } from "@/lib/styles";

const ProductOverview = ({
  productDetail,
}: {
  productDetail: ProductDetailInfo;
}) => {
  const { product, discount } = productDetail;

  return (
    <div className="bg-white">
      <ProductImage
        product={toProductPreview(productDetail)}
        containerSize="large"
        className="w-full aspect-square bg-gray-100"
      />
      <div className="p-4">
        <div className={cn(FLEX_ITEMS_START_BETWEEN, "mb-4")}>
          <h1 className="text-xl font-bold text-gray-900 flex-1">
            {product.name}
          </h1>
          <ProductRating
            averageRating={productDetail.averageRating}
            reviewCount={productDetail.reviewCount}
            size="large"
          />
        </div>
        <ProductPrice product={toProductPreview(productDetail)} size="large" />
        {discount?.discountType === "daily_deal" && <DealTimer />}
      </div>
    </div>
  );
};

export default ProductOverview;

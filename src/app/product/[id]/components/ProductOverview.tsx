"use client";

import { toProductPreview } from "@/lib/utils/productOptionUtils";
import { ProductDetailInfo } from "@/lib/types/productType";

import DealTimer from "@/app/product/(deal)/components/DealTimer";
import ProductImage from "@/app/product/components/ProductImage";
import ProductPrice from "@/app/product/components/ProductPrice";
import ProductRating from "@/app/product/components/ProductRating";

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
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-bold text-gray-900 flex-1">
            {product.name}
          </h1>
          <ProductRating
            product={toProductPreview(productDetail)}
            size="large"
          />
        </div>
        <ProductPrice
          product={toProductPreview(productDetail)}
          size="large"
          showDiscountRate={true}
        />
        {discount?.discountType === "daily_deal" && <DealTimer />}
      </div>
    </div>
  );
};

export default ProductOverview;

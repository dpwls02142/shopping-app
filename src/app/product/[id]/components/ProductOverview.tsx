"use client";

import { ProductDetailInfo } from "@/lib/types/productType";
import ProductPrice from "../../components/ProductPrice";
import DealTimer from "../../(deal)/components/DealTimer";
import ProductRating from "../../components/ProductRating";
import ProductImage from "../../components/ProductImage";
import { toProductPreview } from "@/lib/utils/productOptionUtils";

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

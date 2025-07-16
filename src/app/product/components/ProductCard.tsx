"use client";

import { ProductPreviewInfo } from "@/lib/types/productType";
import Link from "next/link";

import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";
import DealTimer from "@/app/product/(deal)/components/DealTimer";
import { formatPriceToKor } from "@/lib/utils";
import {
  BASE_PRICE_TEXT,
  DISCOUNT_PRICE_TEXT,
  FLEX_ITEMS_CENTER,
  OPTION_TEXT,
  TITLE,
} from "@/lib/styles";

type ProductCardProps = {
  product: ProductPreviewInfo;
  variant?: "default" | "daily_deal";
};

function ProductCard({ product, variant = "default" }: ProductCardProps) {
  if (variant === "daily_deal") {
    return (
      <li key={product.id}>
        <Link href={`/product/${product.id}`}>
          <div className="flex-shrink-0 w-full rounded-lg overflow-hidden">
            <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
              <ProductImage product={product} />
            </div>
            <div className="p-4">
              <h3 className={TITLE}>{product.name}</h3>
              <div className="flex items-baseline my-2">
                <span className={DISCOUNT_PRICE_TEXT}>
                  {formatPriceToKor(product.discountedPrice ?? 0)}원
                </span>
                <span className={BASE_PRICE_TEXT}>
                  {formatPriceToKor(product.basePrice)}원
                </span>
              </div>
              <div className={FLEX_ITEMS_CENTER}>
                <span className="text-yellow-400">★</span>
                <span className={OPTION_TEXT}>
                  {product.averageRating} ({product.reviewCount})
                </span>
              </div>
              <div>
                <DealTimer />
              </div>
            </div>
          </div>
        </Link>
      </li>
    );
  }

  return (
    <li key={product.id}>
      <Link href={`/product/${product.id}`}>
        <ProductImage product={product} />
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <ProductPrice product={product} />
          </div>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <ProductRating product={product} />
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductCard;

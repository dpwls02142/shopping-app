"use client";

import Link from "next/link";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { OPTION_TEXT, TITLE } from "@/lib/styles";

import DealTimer from "@/app/product/_deal/components/DealTimer";
import ProductImage from "@/app/product/components/ProductImage";
import ProductPrice from "@/app/product/components/ProductPrice";

type ProductCardVariant = "default" | "daily_deal";
interface ProductCardProps {
  product: ProductPreviewInfo;
  variant?: ProductCardVariant;
}

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
              <div className="flex items-center justify-between">
                <ProductPrice product={product} size="large" />
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className={OPTION_TEXT}>
                    {product.averageRating} ({product.reviewCount})
                  </span>
                </div>
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
          <div>
            <ProductPrice product={product} />
          </div>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <span className="text-yellow-400">★</span>
            <span className={OPTION_TEXT}>
              {product.averageRating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ProductCard;

"use client";

import Link from "next/link";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { OPTION_TEXT } from "@/lib/styles";

import { ProductImage } from "@/_shared/modules/product/components/ProductImage";
import { ProductPrice } from "@/_shared/modules/product/components/ProductPrice";
interface ProductCardProps {
  product: ProductPreviewInfo;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <li>
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

export { ProductCard };

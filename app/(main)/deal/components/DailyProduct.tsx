"use client";

import Image from "next/image";
import Link from "next/link";

import DealTimer from "@/app/(main)/deal/components/DealTimer";

import { ProductDetailInfo } from "@/lib/types/productType";

import { formatPriceToKor } from "@/lib/utils";

type DailyProductProps = {
  product: ProductDetailInfo;
};

function DailyProduct({ product }: DailyProductProps) {
  return (
    <li key={product.product.id}>
      <Link href={`/product/${product.product.id}`}>
        <div className="flex-shrink-0 w-full rounded-lg overflow-hidden">
          <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
            <Image
              src={product.thumbnailImage ?? ""}
              alt={product.product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">
              {product.product.name}
            </h3>
            <div className="flex items-baseline my-2">
              <span className="text-xl font-bold">
                {formatPriceToKor(product.discount?.discountedPrice ?? 0)}원
              </span>
              <span className="text-gray-500 line-through ml-2">
                {formatPriceToKor(product.product.basePrice)}원
              </span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-500">
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

export default DailyProduct;

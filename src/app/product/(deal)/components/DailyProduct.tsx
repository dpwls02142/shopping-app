"use client";

import Image from "next/image";
import Link from "next/link";

import { formatPriceToKor } from "@/lib/utils";
import { ProductDetailInfo } from "@/lib/types/productType";

import {
  BASE_PRICE_TEXT,
  DISCOUNT_PRICE_TEXT,
  FLEX_ITEMS_CENTER,
  OPTION_TEXT,
  TITLE,
} from "@/lib/styles";

import DealTimer from "@/app/product/(deal)/components/DealTimer";

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
            <h3 className={TITLE}>{product.product.name}</h3>
            <div className="flex items-baseline my-2">
              <span className={DISCOUNT_PRICE_TEXT}>
                {formatPriceToKor(product.discount?.discountedPrice ?? 0)}원
              </span>
              <span className={BASE_PRICE_TEXT}>
                {formatPriceToKor(product.product.basePrice)}원
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

export default DailyProduct;

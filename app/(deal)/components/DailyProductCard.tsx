"use client";

import { ProductDetailInfo } from "@/lib/types/productType";
import useDealTimer from "../hooks/useDealTimer";
import Image from "next/image";
import Link from "next/link";

type DailyProductCardProps = {
  product: ProductDetailInfo;
};

const DailyProductCard = ({ product }: DailyProductCardProps) => {
  const { timeLeft, progress } = useDealTimer();

  return (
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
              {product.discount?.discountedPrice.toLocaleString()}원
            </span>
            <span className="text-gray-500 line-through ml-2">
              {product.product.basePrice.toLocaleString()}원
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-500">
              {product.averageRating} ({product.reviewCount})
            </span>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-xl font-bold text-red-500 whitespace-nowrap">
              {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds} 남음
            </span>
            <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${100 - progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DailyProductCard;

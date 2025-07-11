"use client";

import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { ProductPreviewInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

const ProductImage = ({ product }: { product: ProductPreviewInfo }) => {
  return (
    <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
      <Image
        src={product.thumbnailImage ?? ""}
        alt={product.name}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

const ProductPrice = ({ product }: { product: ProductPreviewInfo }) => {
  const { basePrice, discountedPrice } = product;
  if (!discountedPrice) {
    return (
      <div>
        <span className="text-lg font-bold text-gray-900">
          {formatPriceToKor(basePrice)}원
        </span>
      </div>
    );
  } else {
    return (
      <div>
        <span className="text-lg font-bold text-gray-900">
          {formatPriceToKor(discountedPrice)}원
        </span>
        <span className="text-sm text-gray-500 line-through ml-1">
          {formatPriceToKor(basePrice)}원
        </span>
      </div>
    );
  }
};

const ProductRating = ({ product }: { product: ProductPreviewInfo }) => {
  return (
    <div>
      <span className="text-yellow-400">★</span>
      <span>{product.averageRating}</span>
      <span>({product.reviewCount})</span>
    </div>
  );
};

const PersonalizedProductCard = ({
  product,
}: {
  product: ProductPreviewInfo;
}) => {
  const { navigateTo } = useAppNavigation();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigateTo("product");
    router.push(`/product/${product.id}`);
  };

  return (
    <Link
      key={product.id}
      href={`/product/${product.id}`}
      onClick={handleClick}
    >
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
  );
};

export default PersonalizedProductCard;

"use client";

import { MouseEvent,useState } from "react";
import Link from "next/link";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { OPTION_TEXT } from "@/lib/styles";

import { AddToCartButton } from "@/_shared/modules/product/components/AddToCartButton";
import { AddToCartSheet } from "@/_shared/modules/product/components/AddToCartSheet";
import { ProductImage } from "@/_shared/modules/product/components/ProductImage";
import { ProductPrice } from "@/_shared/modules/product/components/ProductPrice";

interface ProductCardProps {
  product: ProductPreviewInfo;
}

function ProductCard({ product }: ProductCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddToCartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSheetOpen(true);
  };

  return (
    <li>
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <ProductImage product={product} />
          <div className="absolute top-2 right-2 z-10">
            <AddToCartButton onClick={handleAddToCartClick} />
          </div>
        </div>
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
      <AddToCartSheet
        productId={product.id}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </li>
  );
}

export { ProductCard };

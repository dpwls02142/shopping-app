"use client";

import { AddToCartButton } from "@/_shared/modules/product/components/AddToCartButton";
import { AddToCartSheet } from "@/_shared/modules/product/components/AddToCartSheet";
import { ProductImage } from "@/_shared/modules/product/components/ProductImage";
import { ProductPrice } from "@/_shared/modules/product/components/ProductPrice";
import { OPTION_TEXT, TITLE } from "@/lib/styles";
import { ProductPreviewInfo } from "@/lib/types/productType";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import { DealTimer } from "@/_shared/modules/deal/components/DealTimer";

interface ProductCardProps {
  product: ProductPreviewInfo;
}

function DailyProductCard({ product }: ProductCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddToCartClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSheetOpen(true);
  };

  return (
    <li>
      <Link href={`/product/${product.id}`}>
        <div className="flex-shrink-0 w-full rounded-lg overflow-hidden">
          <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
            <ProductImage product={product} />
            <div className="absolute top-2 right-2 z-10">
              <AddToCartButton onClick={handleAddToCartClick} />
            </div>
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
      <AddToCartSheet
        productId={product.id}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </li>
  );
}

export { DailyProductCard };

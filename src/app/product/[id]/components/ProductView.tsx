"use client";

import { useState } from "react";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { formatPriceToKor } from "@/lib/utils";
import { ProductDetailInfo } from "@/lib/types/productType";

import {
  BASE_PRICE_TEXT,
  CART_BOTTOM_CONTAINER,
  DISCOUNT_PRICE_TEXT,
  DISCOUNT_RATE_TEXT,
  FLEX_LAYOUT,
} from "@/lib/styles";
import { Button } from "@/ui/button";
import { Rating, RatingButton } from "@/ui/shadcn-io/rating";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

import useProductNavigation from "@/app/product/hooks/useProductNavigation";

import DealTimer from "@/app/product/(deal)/components/DealTimer";
import AddToCartForm from "@/app/product/[id]/components/AddToCartForm";
import ProductDescription from "@/app/product/[id]/components/ProductDescription";
import ProductReview from "@/app/product/[id]/components/ProductReview";
import ProductNavbar from "@/app/product/components/ProductNavbar";

type ProductDetailProps = {
  productDetail: ProductDetailInfo;
  productId: string;
};

const ProductImage = ({
  thumbnailImage,
  productName,
}: {
  thumbnailImage?: string;
  productName: string;
}) => (
  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
    <Image
      src={thumbnailImage ?? " "}
      alt={productName}
      className="w-full h-full object-cover"
      width={400}
      height={400}
      priority
    />
  </div>
);

const ProductPrice = ({
  basePrice,
  discount,
}: {
  basePrice: number;
  discount?: { discountRate: number; discountedPrice: number };
}) => {
  if (discount) {
    return (
      <div>
        <div className="flex items-center mb-1 space-x-2">
          <span className={DISCOUNT_RATE_TEXT}>{discount.discountRate}%</span>
          <span className={DISCOUNT_PRICE_TEXT}>
            {formatPriceToKor(discount.discountedPrice)}원
          </span>
        </div>
        <div className={BASE_PRICE_TEXT}>{formatPriceToKor(basePrice)}원</div>
      </div>
    );
  } else {
    return (
      <div className={DISCOUNT_PRICE_TEXT}>{formatPriceToKor(basePrice)}원</div>
    );
  }
};

const ProductRating = ({
  averageRating,
  reviewCount,
}: {
  averageRating: number;
  reviewCount: number;
}) => (
  <div className="flex">
    <div className="flex items-center mr-2">
      <Rating value={averageRating} readOnly>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} size={12} />
        ))}
      </Rating>
    </div>
    <span className="text-sm">({reviewCount})</span>
  </div>
);

const ProductInfo = ({
  productDetail,
}: {
  productDetail: ProductDetailInfo;
}) => {
  const { product, discount, thumbnailImage, reviewCount, averageRating } =
    productDetail;
  return (
    <div className="bg-white">
      <ProductImage
        thumbnailImage={thumbnailImage}
        productName={product.name}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-bold text-gray-900 flex-1">
            {product.name}
          </h1>
          <ProductRating
            averageRating={averageRating ?? 0}
            reviewCount={reviewCount ?? 0}
          />
        </div>
        <ProductPrice basePrice={product.basePrice} discount={discount} />
        {discount?.discountType === "daily_deal" && <DealTimer />}
      </div>
    </div>
  );
};

const ProductContent = ({
  productDetail,
  activeTab,
}: {
  productDetail: ProductDetailInfo;
  activeTab: "reviews" | "details";
}) => {
  if (activeTab === "reviews") {
    return (
      <ProductReview
        reviews={productDetail.reviews ?? []}
        averageRating={productDetail.averageRating ?? 0}
        reviewCount={productDetail.reviewCount ?? 0}
      />
    );
  } else if (activeTab === "details") {
    return <ProductDescription detailImages={productDetail.detailImages} />;
  }
};

function ProductView({ productDetail }: ProductDetailProps) {
  const { activeTab, setActiveTab, isVisible } = useProductNavigation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddToCartSuccess = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className={FLEX_LAYOUT}>
      <div className="flex-1 pb-20">
        <ProductInfo productDetail={productDetail} />
        <div className="bg-gray-100 pt-2">
          <ProductNavbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isVisible={isVisible}
          />
          <ProductContent productDetail={productDetail} activeTab={activeTab} />
        </div>
      </div>

      <div className={CART_BOTTOM_CONTAINER}>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="w-full h-12 text-lg font-bold">장바구니</Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[85vh] max-w-[468px] mx-auto rounded-t-2xl p-0 flex flex-col"
          >
            <VisuallyHidden>
              <SheetHeader className="p-4 pb-2 flex-shrink-0">
                <SheetTitle className="text-left">
                  {productDetail.product.name}
                </SheetTitle>
                <SheetDescription className="text-left">
                  원하는 옵션을 선택해주세요
                </SheetDescription>
              </SheetHeader>
            </VisuallyHidden>

            <div className="flex-1 overflow-hidden">
              <AddToCartForm
                productDetail={productDetail}
                onSuccess={handleAddToCartSuccess}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default ProductView;

"use client";
import Image from "next/image";
import { useState } from "react";

import ProductDealTimer from "@/app/(deal)/components/ProductDealTimer";
import ProductDetail from "@/app/product/components/ProductDetail";
import ProductNavbar from "@/app/product/components/ProductNavbar";
import ProductReview from "@/app/product/components/ProductReview";
import AddToCartForm from "@/app/product/forms/AddToCartForm";
import useProductNavigation from "@/app/product/hooks/useProductNavigation";
import { Button } from "@/components/ui/button";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProductDetailInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";

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
        <div className="flex items-center mb-1">
          <span className="text-2xl font-bold text-red-500 mr-2">
            {discount.discountRate}%
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPriceToKor(discount.discountedPrice)}원
          </span>
        </div>
        <div className="text-sm text-gray-500 line-through">
          {formatPriceToKor(basePrice)}원
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-2xl font-bold text-gray-900">
        {formatPriceToKor(basePrice)}원
      </div>
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
        {discount?.discountType === "daily_deal" && <ProductDealTimer />}
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
    return <ProductDetail detailImages={productDetail.detailImages} />;
  }
};

const ProductView = ({ productDetail }: ProductDetailProps) => {
  const { activeTab, setActiveTab, isVisible } = useProductNavigation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddToCartSuccess = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
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

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[468px] bg-white border-t border-gray-200 p-4 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button className="w-full h-12 text-lg font-bold">장바구니</Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[85vh] max-w-[468px] mx-auto rounded-t-2xl p-0 flex flex-col"
          >
            <SheetHeader className="p-4 pb-2 flex-shrink-0">
              <SheetTitle className="text-left">
                {productDetail.product.name}
              </SheetTitle>
              <SheetDescription className="text-left">
                원하는 옵션을 선택해주세요
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <AddToCartForm
                productDetail={productDetail}
                onSuccess={handleAddToCartSuccess}
                hideTitle={true}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductView;

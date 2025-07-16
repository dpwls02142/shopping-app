"use client";

import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ProductDetailInfo } from "@/lib/types/productType";

import { CART_BOTTOM_CONTAINER, FLEX_LAYOUT } from "@/lib/styles";
import { Button } from "@/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

import useProductTab from "@/app/product/[id]/hooks/useProductTab";

import AddToCartForm from "@/app/product/[id]/components/forms/AddToCartForm";
import ProductOverview from "@/app/product/[id]/components/ProductOverview";
import ProductTab from "@/app/product/[id]/components/ProductTab";
import ProductContent from "@/app/product/[id]/components/ProductTabContent";

type ProductDetailProps = {
  productDetail: ProductDetailInfo;
  productId: string;
};

function ProductDetailView({ productDetail }: ProductDetailProps) {
  const { activeTab, setActiveTab, isVisible } = useProductTab();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAddToCartSuccess = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className={FLEX_LAYOUT}>
      <div className="flex-1 pb-20">
        <ProductOverview productDetail={productDetail} />
        <div className="bg-gray-100 pt-2">
          <ProductTab
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

export default ProductDetailView;

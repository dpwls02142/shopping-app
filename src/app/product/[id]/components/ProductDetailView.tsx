"use client";

import { useRef, useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ProductDetailInfo } from "@/lib/types/productType";

import { CART_BOTTOM_CONTAINER } from "@/lib/styles";
import { Button } from "@/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet";

import { useProductTab } from "@/app/product/[id]/hooks/useProductTab";
import { useProductTabObserver } from "@/app/product/[id]/hooks/useProductTabObserver";
import { useProductPurchase } from "@/app/product/hooks/useProductPurchase";
import { useCartStore } from "@/app/cart/stores/useCartStore";

import { ProductActionForm } from "@/app/product/[id]/components/ProductActionForm";
import { ProductDescription } from "@/app/product/[id]/components/ProductDescription";
import { ProductOverview } from "@/app/product/[id]/components/ProductOverview";
import { ProductReview } from "@/app/product/[id]/components/ProductReview";
import { ProductTab } from "@/app/product/[id]/components/ProductTab";

import { fetchProductDetail } from "@/lib/api/productApi";

interface ProductDetailProps {
  productId: string;
}

function ProductDetailView({ productId }: ProductDetailProps) {
  const { activeTab, setActiveTab, isVisible } = useProductTab();
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLDivElement | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);
  const purchaseMutation = useProductPurchase();
  const queryClient = useQueryClient();

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductDetail(productId),
    staleTime: 1000 * 60 * 5,
  });

  useProductTabObserver({ reviewRef, descriptionRef, setActiveTab });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">상품 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (isError || !productDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">상품을 불러올 수 없습니다.</div>
      </div>
    );
  }

  const handleAddToCart = async (optionId: string, quantity: number) => {
    try {
      const selectedOption = productDetail.options?.find(
        (option) => option.id === optionId
      );
      if (!selectedOption) return;
      addToCart(
        productDetail.product,
        [selectedOption],
        quantity,
        productDetail.discount?.discountedPrice,
        productDetail.options
      );
      alert("장바구니에 추가되었습니다.");
      setIsSheetOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("장바구니 추가 중 오류가 발생했습니다.");
      }
    }
  };

  const handleBuyNow = async (optionId: string, quantity: number) => {
    try {
      await purchaseMutation.mutateAsync({
        optionId,
        quantityToDeduct: quantity,
      });

      await queryClient.refetchQueries({
        queryKey: ["productDetail", productId],
      });

      const freshProductDetail = queryClient.getQueryData<ProductDetailInfo>([
        "productDetail",
        productId,
      ]);

      const cartItems = useCartStore.getState().items;
      const existingCartItem = cartItems.find((item) => {
        if (item.product.id !== productDetail.product.id) return false;
        return item.selectedOptions.some((option) => option.id === optionId);
      });

      if (existingCartItem && freshProductDetail) {
        const updatedQuantity = existingCartItem.quantity - quantity;
        if (updatedQuantity <= 0) {
          useCartStore.getState().removeFromCart(existingCartItem.id);
        } else {
          useCartStore
            .getState()
            .updateQuantity(
              existingCartItem.id,
              updatedQuantity,
              freshProductDetail.options
            );
        }
      }
      alert("구매가 완료되었습니다!");
      setIsSheetOpen(false);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("구매 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 pb-20">
        <ProductOverview productDetail={productDetail} />
        <div className="bg-gray-100 pt-2">
          <ProductTab
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              if (tab === "reviews") {
                reviewRef.current?.scrollIntoView({ behavior: "smooth" });
              } else if (tab === "details") {
                descriptionRef.current?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            isVisible={isVisible}
          />
          <div ref={reviewRef}>
            <ProductReview reviews={productDetail.reviews ?? []} />
          </div>
          <div ref={descriptionRef}>
            <ProductDescription
              descriptionImages={productDetail.detailImages}
            />
          </div>
        </div>
      </div>

      <div className={CART_BOTTOM_CONTAINER}>
        <div className="flex gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button className="flex-1 h-12 text-lg font-bold">
                장바구니
              </Button>
            </SheetTrigger>
            <Button
              className="flex-1 h-12 text-lg font-bold bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsSheetOpen(true)}
            >
              구매하기
            </Button>

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
                <ProductActionForm
                  productDetail={productDetail}
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export { ProductDetailView };

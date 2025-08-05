"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useCartStore } from "@/_shared/modules/cart/stores/useCartStore";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/_shared/components/sheet";
import { AddToCartForm } from "@/_shared/modules/product/components/AddToCartForm";

import { fetchProductDetail } from "@/lib/api/productApi";

interface AddToCartSheetProps {
  productId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

function AddToCartSheet({
  productId,
  isOpen,
  onOpenChange,
}: AddToCartSheetProps) {
  const addToCart = useCartStore((s) => s.addToCart);
  const queryClient = useQueryClient();

  const { data: productDetail } = useQuery({
    queryKey: ["productDetail", productId],
    queryFn: () => fetchProductDetail(productId),
  });

  const handleAddToCart = async (optionId: string, quantity: number) => {
    if (!productDetail) return;
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
      onOpenChange(false);
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (_error: unknown) {
      return;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] max-w-[468px] mx-auto rounded-t-2xl p-0 flex flex-col"
      >
        <VisuallyHidden>
          <SheetHeader className="p-4 pb-2 flex-shrink-0">
            <SheetTitle className="text-left">
              {productDetail?.product.name}
            </SheetTitle>
            <SheetDescription className="text-left">
              원하는 옵션을 선택해주세요
            </SheetDescription>
          </SheetHeader>
        </VisuallyHidden>

        <div className="flex-1 overflow-hidden">
          {productDetail && (
            <AddToCartForm
              productDetail={productDetail}
              onAddToCart={handleAddToCart}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { AddToCartSheet };

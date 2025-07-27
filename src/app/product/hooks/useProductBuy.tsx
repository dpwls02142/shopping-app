import { useMutation, useQueryClient } from "@tanstack/react-query";

import { notification } from "@/lib/utils/notification";
import { ProductOption } from "@/lib/types/productType";

import { buyProduct, buyProducts } from "@/lib/api/productApi";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/lib/constants/message";

type SingleUpdate = { optionId: string; quantityToDeduct: number };
type MultipleUpdate = Array<{ optionId: string; quantityToDeduct: number }>;

function useProductBuy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SingleUpdate | MultipleUpdate) => {
      return Array.isArray(params)
        ? buyProducts(params)
        : buyProduct(params.optionId, params.quantityToDeduct);
    },
    onSuccess: (result: ProductOption | ProductOption[]) => {
      const options = Array.isArray(result) ? result : [result];
      const productIds = [
        ...new Set(options.map((option) => option.productId)),
      ];

      productIds.forEach((productId) => {
        queryClient.invalidateQueries({
          queryKey: ["productDetail", productId],
        });
        queryClient.invalidateQueries({
          queryKey: ["productOptions", productId],
        });
      });
      notification.success(SUCCESS_MESSAGE.PURCHASE_COMPLETE);
    },
    onError: (error: unknown) => {
      const errorMessage =
        error instanceof Error ? error.message : ERROR_MESSAGE.BUY_NOW_ERROR;
      notification.error(errorMessage);
    },
  });
}

export { useProductBuy };

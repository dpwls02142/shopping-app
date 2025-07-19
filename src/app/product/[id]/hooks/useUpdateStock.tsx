import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ProductOption } from "@/lib/types/productType";

import { updateProductStock, updateProductStocks } from "@/lib/api/productApi";

type SingleUpdate = { optionId: string; quantityToDeduct: number };
type MultipleUpdate = Array<{ optionId: string; quantityToDeduct: number }>;

const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SingleUpdate | MultipleUpdate) => {
      return Array.isArray(params)
        ? updateProductStocks(params)
        : updateProductStock(params.optionId, params.quantityToDeduct);
    },
    onSuccess: (result: ProductOption | ProductOption[]) => {
      const options = Array.isArray(result) ? result : [result];
      const productIds = [
        ...new Set(options.map((option) => option.productId)),
      ];

      productIds.forEach((productId) => {
        queryClient.invalidateQueries({
          queryKey: ["productOptions", productId],
        });
        queryClient.invalidateQueries({
          queryKey: ["productDetail", productId],
        });
      });
    },
    onError: (error) => {
      console.error(`재고 차감 실패: ${error}`);
    },
  });
};

export default useUpdateStock;

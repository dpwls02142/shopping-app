import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductDetailView } from "@/_shared/modules/product/components/ProductDetailView";

import { fetchProductDetail } from "@/lib/api/productApi";
import { getQueryClient } from "@/lib/queryClient";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage(props: ProductPageProps) {
  const { id: productId } = await props.params;
  const queryClient = getQueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: ["productDetail", productId],
      queryFn: () => fetchProductDetail(productId),
      staleTime: 60 * 1000,
    })
    .catch(() => {});

  return (
    <div className="min-h-screen bg-gray-50">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailView productId={productId} />
      </HydrationBoundary>
    </div>
  );
}

export default ProductPage;

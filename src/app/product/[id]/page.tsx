import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ProductDetailView } from "@/app/product/[id]/components/ProductDetailView";
import { fetchProductDetail } from "@/lib/api/productApi";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage(props: ProductPageProps) {
  const { id: productId } = await props.params;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["productDetail", productId],
      queryFn: () => fetchProductDetail(productId),
      staleTime: 1000 * 60 * 5,
    });
  } catch (error) {
    console.error(`fetch product detailerror: ${error}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailView productId={productId} />
      </HydrationBoundary>
    </div>
  );
}

export default ProductPage;

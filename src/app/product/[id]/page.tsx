import { ProductDetailView } from "@/app/product/[id]/components/ProductDetailView";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage(props: ProductPageProps) {
  const { id: productId } = await props.params;

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetailView productId={productId} />
    </div>
  );
}

export default ProductPage;

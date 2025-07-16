import { fetchProductDetail } from "@/lib/api/productApi";

import ProductView from "@/app/product/components/ProductView";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function ProductPage(props: ProductPageProps) {
  try {
    const { id: productId } = await props.params;
    const productDetail = await fetchProductDetail(productId);

    return (
      <div className="min-h-screen bg-gray-50">
        <ProductView productDetail={productDetail} productId={productId} />
      </div>
    );
  } catch {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>상품을 불러올 수 없습니다.</div>
      </div>
    );
  }
}

export default ProductPage;
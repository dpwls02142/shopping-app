import { Suspense } from "react";

import ProductListSkeleton from "@/ui/ProductListSkeleton";

import ProductCard from "@/app/product/components/ProductCard";

import { fetchCustomers } from "@/lib/api/customerApi";
import { fetchProductPreviewInfo } from "@/lib/api/productsApi";

async function PersonalizedProductList() {
  const [products, customers] = await Promise.all([
    fetchProductPreviewInfo(),
    fetchCustomers(),
  ]);
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <section className="px-4 py-6">
        <h2 className="text-xl font-bold mb-4">
          <span>{customers[0].name}님을 위한 추천 상품</span>
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </Suspense>
  );
}

export default PersonalizedProductList;

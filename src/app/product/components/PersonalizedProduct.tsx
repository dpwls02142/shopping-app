import { Suspense } from "react";
import Link from "next/link";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { fetchCustomers } from "@/lib/api/customerApi";
import { fetchProductPreviewInfo } from "@/lib/api/productsApi";

import ProductImage from "@/app/product/components/ProductImage";
import ProductPrice from "@/app/product/components/ProductPrice";
import ProductRating from "@/app/product/components/ProductRating";

function PersonalizedProductCard({ product }: { product: ProductPreviewInfo }) {
  return (
    <li key={product.id}>
      <Link href={`/product/${product.id}`}>
        <ProductImage product={product} />
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center space-x-2">
            <ProductPrice product={product} />
          </div>
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <ProductRating product={product} />
          </div>
        </div>
      </Link>
    </li>
  );
}

async function PersonalizedProductsContent() {
  const [products, customers] = await Promise.all([
    fetchProductPreviewInfo(),
    fetchCustomers(),
  ]);
  return (
    <section className="px-4 py-6">
      <h2 className="text-xl font-bold mb-4">
        <span>{customers[0].name}님을 위한 추천 상품</span>
      </h2>
      <ul className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <PersonalizedProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="space-y-1">
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg bg-gray-200">
        <div className="w-full h-full flex items-center justify-center" />
      </div>
      <div className="space-y-1">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center text-xs gap-1">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <section className="px-4 py-6">
      <div className="mb-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

function PersonalizedProduct() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <PersonalizedProductsContent />
    </Suspense>
  );
}

export default PersonalizedProduct;

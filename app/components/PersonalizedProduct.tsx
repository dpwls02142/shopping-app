import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import PersonalizedProductSkeleton from "@/app/components/PersonalizedProductSkeleton";
import { fetchCustomers } from "@/lib/api/customerApi";
import { fetchProductPreviewInfo } from "@/lib/api/productsApi";
import { ProductPreviewInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";

const ProductImage = ({ product }: { product: ProductPreviewInfo }) => (
  <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
    <Image
      src={product.thumbnailImage ?? ""}
      alt={product.name}
      fill
      sizes="50vw"
      className="object-cover"
      priority
    />
  </div>
);

const ProductPrice = ({ product }: { product: ProductPreviewInfo }) => {
  const { basePrice, discountedPrice } = product;
  if (!discountedPrice) {
    return (
      <div>
        <span className="text-lg font-bold text-gray-900">
          {formatPriceToKor(basePrice)}원
        </span>
      </div>
    );
  }
  return (
    <div>
      <span className="text-lg font-bold text-gray-900">
        {formatPriceToKor(discountedPrice)}원
      </span>
      <span className="text-sm text-gray-500 line-through ml-1">
        {formatPriceToKor(basePrice)}원
      </span>
    </div>
  );
};

const ProductRating = ({ product }: { product: ProductPreviewInfo }) => (
  <div>
    <span className="text-yellow-400">★</span>
    <span>{product.averageRating}</span>
    <span>({product.reviewCount})</span>
  </div>
);

const PersonalizedProductCard = ({
  product,
}: {
  product: ProductPreviewInfo;
}) => (
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

const PersonalizedProductsContent = async () => {
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
};

const PersonalizedProduct = () => (
  <Suspense fallback={<PersonalizedProductSkeleton />}>
    <PersonalizedProductsContent />
  </Suspense>
);

export default PersonalizedProduct;

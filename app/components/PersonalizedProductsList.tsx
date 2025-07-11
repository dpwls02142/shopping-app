import { fetchProductPreviewInfo } from "@/lib/api/productApi";
import { fetchCustomers } from "@/lib/api/customerApi";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ProductPreviewInfo } from "@/lib/types/productType";

const CustomerName = async () => {
  const customers = await fetchCustomers();
  return <span>{customers[0].name}님을 위한 추천 상품</span>;
};

const PersonalizedProduct = async () => {
  const products = await fetchProductPreviewInfo();

  const formatPriceToKor = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const displayPrice = (product: ProductPreviewInfo) => {
    const basePrice = product.basePrice;
    const discountedPrice = product.discountedPrice;

    if (!discountedPrice) {
      return (
        <span className="text-lg font-bold text-gray-900">
          {formatPriceToKor(basePrice)}원
        </span>
      );
    } else {
      return (
        <div>
          <span className="text-lg font-bold text-gray-900">
            {formatPriceToKor(discountedPrice)}원
          </span>
          <span className="text-sm text-gray-500 line-through">
            {formatPriceToKor(basePrice)}원
          </span>
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
            <Image
              src={product.thumbnailImage ?? ""}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              {displayPrice(product)}
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span>{product.averageRating}</span>
              </div>
              <span>({product.reviewCount})</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const PersonalizedProductsList = () => {
  return (
    <Suspense fallback={<span>로딩 중...</span>}>
      <section className="px-4 py-6">
        <h2 className="text-xl font-bold mb-4">
          <CustomerName />
        </h2>
        <PersonalizedProduct />
      </section>
    </Suspense>
  );
};

export default PersonalizedProductsList;

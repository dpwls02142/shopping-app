import Image from "next/image";
import Link from "next/link";

import { fetchAllProductsWithDetails } from "@/lib/api/productsApi";
import { formatPriceToKor } from "@/lib/utils";

async function BrandProductList() {
  const products = await fetchAllProductsWithDetails();
  const brandDealProducts = products.filter(
    (p) => p.discount?.discountType === "brand_deal"
  );

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold px-4">브랜드 특가</h2>
      <ul className="grid grid-cols-2 gap-4 p-4 max-w-4xl mx-auto list-none">
        {brandDealProducts.map((product) => (
          <li key={product.product.id}>
            <Link href={`/product/${product.product.id}`}>
              <div className="flex-shrink-0 w-full bg-white rounded-lg overflow-hidden">
                <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
                  <Image
                    src={product.thumbnailImage ?? ""}
                    alt={product.product.name}
                    sizes="468px"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {product.product.name}
                  </h3>
                  <div className="flex items-baseline my-2">
                    <span className="text-xl font-bold">
                      {formatPriceToKor(product.discount?.discountedPrice ?? 0)}
                      원
                    </span>
                    <span className="text-gray-500 line-through ml-2">
                      {formatPriceToKor(product.product.basePrice)}원
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-500">
                      {product.averageRating} ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandProductList;

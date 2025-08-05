import Link from "next/link";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { OPTION_TEXT, TITLE } from "@/lib/styles";

import { DealTimer } from "@/app/product/_deal/components/DealTimer";
import { ProductImage } from "@/app/product/components/ProductImage";
import { ProductPrice } from "@/app/product/components/ProductPrice";

import { fetchProductPreviewInfo } from "@/lib/api/productsApi";
interface ProductCardProps {
  product: ProductPreviewInfo;
}

function DailyProductCard({ product }: ProductCardProps) {
  return (
    <li key={product.id}>
      <Link href={`/product/${product.id}`}>
        <div className="flex-shrink-0 w-full rounded-lg overflow-hidden">
          <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
            <ProductImage product={product} />
          </div>
          <div className="p-4">
            <h3 className={TITLE}>{product.name}</h3>
            <div className="flex items-center justify-between">
              <ProductPrice product={product} size="large" />
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className={OPTION_TEXT}>
                  {product.averageRating} ({product.reviewCount})
                </span>
              </div>
            </div>
            <div>
              <DealTimer />
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

async function DailyProductList() {
  const products = await fetchProductPreviewInfo();
  const dailyDealProducts = products.filter(
    (product) => product.discountType === "daily_deal"
  );

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold px-4">하루 특가</h2>
      <p className="text-gray-500 px-4">할인 기간이 하루 남은 상품이에요</p>
      <div className="flex flex-col space-y-4 p-4 max-w-4xl mx-auto">
        <ul className="list-none p-0 m-0">
          {dailyDealProducts.map((product) => (
            <DailyProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export { DailyProductList };

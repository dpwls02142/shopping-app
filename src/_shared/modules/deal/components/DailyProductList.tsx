import { DailyProductCard } from "@/_shared/modules/deal/components/DailyProductCard";
import { fetchProductPreviewInfo } from "@/lib/api/productsApi";

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

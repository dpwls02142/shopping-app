import { fetchAllProductsWithDetails } from "@/lib/api/productsApi";

const DailyProducts = async () => {
  const products = await fetchAllProductsWithDetails();
  const dailyDealProducts = products.filter(
    (p) => p.discount?.discountType === "daily_deal"
  );

  return (
    <div>
      <h2>하루 특가</h2>
      <div>할인 기간이 하루 남은 상품이에요</div>
      <ul>
        {dailyDealProducts.map((p) => (
          <li key={p.product.id}>{p.product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailyProducts;

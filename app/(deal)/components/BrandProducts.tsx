import { fetchAllProductsWithDetails } from "@/lib/api/productsApi";

const BrandProducts = async () => {
  const products = await fetchAllProductsWithDetails();
  const brandDealProducts = products.filter(
    (p) => p.discount?.discountType === "brand_deal"
  );

  return (
    <div>
      <h2>브랜드 특가</h2>
      <ul>
        {brandDealProducts.map((p) => (
          <li key={p.product.id}>{p.product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BrandProducts;

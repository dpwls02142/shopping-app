import ProductCard from "@/app/product/components/ProductCard";

import { fetchProductPreviewInfo } from "@/lib/api/productsApi";

async function BrandProductList() {
  const products = await fetchProductPreviewInfo();
  const brandDealProducts = products.filter(
    (product) => product.discountType === "brand_deal"
  );

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold px-4">브랜드 특가</h2>
      <ul className="grid grid-cols-2 gap-4 p-4 max-w-4xl mx-auto list-none">
        {brandDealProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export { BrandProductList };

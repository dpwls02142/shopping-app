import { fetchProductPreviewInfo } from "@/lib/api/productApi";
import { fetchCustomers } from "@/lib/api/customerApi";
import { Suspense } from "react";
import PersonalizedProductCard from "@/app/components/PersonalizedProductCard";

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
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <PersonalizedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
const PersonalizedProduct = () => {
  return (
    <Suspense fallback={<span>로딩 중...</span>}>
      <PersonalizedProductsContent />
    </Suspense>
  );
};

export default PersonalizedProduct;

import { ProductPreviewInfo } from "@/lib/types/productType";

function ProductRating({ product }: { product: ProductPreviewInfo }) {
  return (
    <div>
      <span className="text-yellow-400">★</span>
      <span>{product.averageRating}</span>
      <span>({product.reviewCount})</span>
    </div>
  );
}

export default ProductRating;

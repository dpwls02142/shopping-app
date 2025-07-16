import { ProductPreviewInfo } from "@/lib/types/productType";
import Link from "next/link";

import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductRating from "./ProductRating";

function ProductCard({ product }: { product: ProductPreviewInfo }) {
  return (
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
}

export default ProductCard;

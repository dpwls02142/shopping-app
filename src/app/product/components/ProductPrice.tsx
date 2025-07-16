import { ProductPreviewInfo } from "@/lib/types/productType";
import { formatPriceToKor } from "@/lib/utils";

function ProductPrice({ product }: { product: ProductPreviewInfo }) {
  const { basePrice, discountedPrice } = product;
  if (!discountedPrice) {
    return (
      <div>
        <span className="text-lg font-bold text-gray-900">
          {formatPriceToKor(basePrice)}원
        </span>
      </div>
    );
  }
  return (
    <div>
      <span className="text-lg font-bold text-gray-900">
        {formatPriceToKor(discountedPrice)}원
      </span>
      <span className="text-sm text-gray-500 line-through ml-1">
        {formatPriceToKor(basePrice)}원
      </span>
    </div>
  );
}

export default ProductPrice;
import { formatPriceToKor } from "@/lib/utils";
import { ProductPreviewInfo } from "@/lib/types/productType";

import { PRODUCT_PRICE_SIZE } from "@/lib/styles";

type ProductPriceProps = {
  product: ProductPreviewInfo;
  size?: "small" | "medium" | "large";
  showDiscountRate?: boolean;
};

function ProductPrice({
  product,
  size = "medium",
  showDiscountRate = false,
}: ProductPriceProps) {
  const { basePrice, discountedPrice, discountRate } = product;

  const classes = PRODUCT_PRICE_SIZE[size];

  if (!discountedPrice) {
    return (
      <div>
        <span className={classes.main}>{formatPriceToKor(basePrice)}원</span>
      </div>
    );
  }

  return (
    <div>
      {showDiscountRate && discountRate && (
        <span className={classes.discount}>{discountRate}%</span>
      )}
      <span className={classes.main}>
        {formatPriceToKor(discountedPrice)}원
      </span>
      <span className={classes.secondary}>{formatPriceToKor(basePrice)}원</span>
    </div>
  );
}

export default ProductPrice;

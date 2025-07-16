import { formatPriceToKor } from "@/lib/utils";
import { ProductPreviewInfo } from "@/lib/types/productType";

import { FLEX_ITEMS_CENTER, PRODUCT_PRICE_SIZE } from "@/lib/styles";

type ProductPriceProps = {
  product: ProductPreviewInfo;
  size?: "small" | "medium" | "large";
};

function ProductPrice({ product, size = "medium" }: ProductPriceProps) {
  const { basePrice, discountedPrice, discountRate } = product;

  const classes = PRODUCT_PRICE_SIZE[size];

  if (!discountedPrice) {
    return (
      <div>
        <span className={classes.main}>{formatPriceToKor(basePrice)}원</span>
      </div>
    );
  } else {
    return (
      <div className="space-x-1">
        <span className={classes.discount}>{discountRate}%</span>
        <span className={classes.main}>
          {formatPriceToKor(discountedPrice)}원
        </span>
        <span className={classes.secondary}>
          {formatPriceToKor(basePrice)}원
        </span>
      </div>
    );
  }
}

export default ProductPrice;

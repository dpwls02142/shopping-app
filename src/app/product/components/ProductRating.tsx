import { PRODUCT_RATING_SIZE } from "@/lib/styles";
import { ProductPreviewInfo } from "@/lib/types/productType";
import { Rating, RatingButton } from "@/ui/shadcn-io/rating";

type ProductRatingProps = {
  product: ProductPreviewInfo;
  size?: "small" | "medium" | "large";
  showCount?: boolean;
};

function ProductRating({
  product,
  size = "medium",
  showCount = true,
}: ProductRatingProps) {
  const classes = PRODUCT_RATING_SIZE[size];

  return (
    <div className={classes.container}>
      <div className={classes.rating}>
        <Rating value={product.averageRating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={classes.starSize} />
          ))}
        </Rating>
      </div>
      {showCount && (
        <span className={classes.count}>({product.reviewCount})</span>
      )}
    </div>
  );
}

export default ProductRating;

import { PRODUCT_RATING_SIZE } from "@/lib/styles";
import { Rating, RatingButton } from "@/ui/shadcn-io/rating";

interface ProductRatingProps {
  averageRating?: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "small" | "medium" | "large";
}

function ProductRating({
  averageRating,
  reviewCount,
  showCount = true,
  size = "medium",
}: ProductRatingProps) {
  const classes = PRODUCT_RATING_SIZE[size];

  return (
    <div className={classes.container}>
      <div className={classes.rating}>
        <Rating value={averageRating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={classes.starSize} />
          ))}
        </Rating>
      </div>
      {showCount && <span className={classes.count}>({reviewCount})</span>}
    </div>
  );
}

export default ProductRating;

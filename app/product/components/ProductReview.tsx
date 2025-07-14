import { Review } from "@/lib/types/productType";
import Image from "next/image";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { formatDateToKor } from "@/lib/utils/constant";
type ProductReviewProps = {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
};

const renderStars = (rating: number) => {
  return (
    <Rating value={rating}>
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} size={12} />
      ))}
    </Rating>
  );
};
const ProductReview = ({ reviews }: ProductReviewProps) => {
  return (
    <div className="bg-white">
      <div className="divide-y divide-gray-200">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {renderStars(review.reviewScore)}
                  <span className="ml-2 text-sm text-gray-600">
                    {formatDateToKor(review.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-gray-800 mb-3">{review.reviewDetail}</p>
              {review.imageUrl && (
                <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={review.imageUrl}
                    alt="리뷰 이미지"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                    priority
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>아직 리뷰가 없습니다.</p>
            <p className="text-sm mt-1">첫 번째 리뷰를 작성해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;

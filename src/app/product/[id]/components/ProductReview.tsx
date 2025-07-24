import { useState } from "react";
import Image from "next/image";

import { formatDateToKor } from "@/lib/utils";
import { Review } from "@/lib/types/productType";

import { Button } from "@/ui/button";

import { ProductRating } from "@/app/product/components/ProductRating";

interface ProductReviewProps {
  reviews: Review[];
}

const MORE_REVIEW_COUNT = 5;

function ProductReview({ reviews }: ProductReviewProps) {
  const [showAll, setShowAll] = useState(false);
  const hasMore = reviews.length > MORE_REVIEW_COUNT;
  const displayedReviews = showAll
    ? reviews
    : reviews.slice(0, MORE_REVIEW_COUNT);

  return (
    <div className="bg-white">
      <div className="divide-y divide-gray-200">
        {displayedReviews.length > 0 ? (
          <>
            {displayedReviews.map((review) => (
              <div key={review.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <ProductRating
                      averageRating={review.reviewScore}
                      showCount={false}
                      size="medium"
                    />
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
            ))}
            {hasMore && !showAll && (
              <div className="p-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(true)}
                  className="w-full"
                >
                  더보기
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p>아직 리뷰가 없습니다.</p>
            <p className="text-sm mt-1">첫 번째 리뷰를 작성해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}

export { ProductReview };

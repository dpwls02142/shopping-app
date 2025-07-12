"use client";
import { formatPriceToKor } from "@/lib/utils/constant";
import { ProductDetailInfo } from "@/lib/types/productType";
import ProductNavbar from "@/app/product/components/ProductNavbar";
import ProductReview from "@/app/product/components/ProductReview";
import ProductDetail from "@/app/product/components/ProductDetail";
import useProductNavgation from "@/app/product/hooks/useProductNavgation";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import Image from "next/image";

type ProductDetailProps = {
  productDetail: ProductDetailInfo;
  productId: string;
};

const ProductImage = ({
  thumbnailImage,
  productName,
}: {
  thumbnailImage?: string;
  productName: string;
}) => (
  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
    <Image
      src={thumbnailImage ?? " "}
      alt={productName}
      className="w-full h-full object-cover"
      width={400}
      height={400}
      priority
    />
  </div>
);

const ProductPrice = ({
  basePrice,
  discount,
}: {
  basePrice: number;
  discount?: { discountRate: number; discountedPrice: number };
}) => {
  if (discount) {
    return (
      <div>
        <div className="flex items-center mb-1">
          <span className="text-2xl font-bold text-red-500 mr-2">
            {discount.discountRate}%
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatPriceToKor(discount.discountedPrice)}원
          </span>
        </div>
        <div className="text-sm text-gray-500 line-through">
          {formatPriceToKor(basePrice)}원
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-2xl font-bold text-gray-900">
        {formatPriceToKor(basePrice)}원
      </div>
    );
  }
};

const ProductRating = ({
  averageRating,
  reviewCount,
}: {
  averageRating: number;
  reviewCount: number;
}) => (
  <div className="flex">
    <div className="flex items-center mr-2">
      <Rating value={averageRating} readOnly>
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} size={12} />
        ))}
      </Rating>
    </div>
    <span className="text-sm">({reviewCount})</span>
  </div>
);

const ProductInfo = ({
  productDetail,
}: {
  productDetail: ProductDetailInfo;
}) => {
  const { product, discount, thumbnailImage, reviewCount, averageRating } =
    productDetail;
  return (
    <div className="bg-white">
      <ProductImage
        thumbnailImage={thumbnailImage}
        productName={product.name}
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-xl font-bold text-gray-900 flex-1">
            {product.name}
          </h1>
          <ProductRating
            averageRating={averageRating ?? 0}
            reviewCount={reviewCount ?? 0}
          />
        </div>
        <ProductPrice basePrice={product.basePrice} discount={discount} />
      </div>
    </div>
  );
};

const ProductContent = ({
  productDetail,
  activeTab,
}: {
  productDetail: ProductDetailInfo;
  activeTab: "reviews" | "details";
}) => {
  if (activeTab === "reviews") {
    return (
      <ProductReview
        reviews={productDetail.reviews ?? []}
        averageRating={productDetail.averageRating ?? 0}
        reviewCount={productDetail.reviewCount ?? 0}
      />
    );
  } else if (activeTab === "details") {
    return <ProductDetail detailImages={productDetail.detailImages} />;
  }
};

const ProductView = ({ productDetail }: ProductDetailProps) => {
  const { activeTab, setActiveTab } = useProductNavgation();
  return (
    <div>
      <ProductInfo productDetail={productDetail} />
      <div className="bg-gray-100 pt-2">
        <ProductNavbar activeTab={activeTab} onTabChange={setActiveTab} />
        <ProductContent productDetail={productDetail} activeTab={activeTab} />
      </div>
    </div>
  );
};

export default ProductView;

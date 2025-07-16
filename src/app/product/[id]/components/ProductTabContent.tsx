import { ProductDetailInfo } from "@/lib/types/productType";

import ProductDescription from "./ProductDescription";
import ProductReview from "./ProductReview";

const ProductTabContent = ({
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
    return <ProductDescription detailImages={productDetail.detailImages} />;
  }
};

export default ProductTabContent;

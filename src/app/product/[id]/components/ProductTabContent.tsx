import { ProductDetailInfo } from "@/lib/types/productType";
import ProductReview from "./ProductReview";
import ProductDescription from "./ProductDescription";

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

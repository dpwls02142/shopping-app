import Image from "next/image";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { PRODUCT_IMAGE_CONTAINER } from "@/lib/styles";

type ProductImageProps = {
  product: ProductPreviewInfo;
  containerSize?: "small" | "medium" | "large";
};

function ProductImage({
  product,
  containerSize = "medium",
}: ProductImageProps) {
  return (
    <div className={PRODUCT_IMAGE_CONTAINER[containerSize]}>
      <Image
        src={product.thumbnailImage ?? ""}
        alt={product.name}
        fill
        sizes={containerSize}
        priority={containerSize !== "small"}
      />
    </div>
  );
}

export default ProductImage;

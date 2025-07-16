import Image from "next/image";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { PRODUCT_IMAGE_CONTAINER } from "@/lib/styles";

type ProductImageProps = {
  product: ProductPreviewInfo;
  containerSize?: "small" | "medium" | "large";
  className?: string;
};

function ProductImage({
  product,
  containerSize = "medium",
  className = "",
}: ProductImageProps) {
  return (
    <div className={`${PRODUCT_IMAGE_CONTAINER[containerSize]} ${className}`}>
      <Image
        src={product.thumbnailImage ?? ""}
        alt={product.name}
        fill
        sizes={containerSize}
        className="object-cover"
        priority={containerSize !== "small"}
      />
    </div>
  );
}

export default ProductImage;

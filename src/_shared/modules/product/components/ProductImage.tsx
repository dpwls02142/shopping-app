import Image from "next/image";

import { ProductPreviewInfo } from "@/lib/types/productType";

import { PRODUCT_IMAGE_CONTAINER, PRODUCT_IMAGE_SIZES } from "@/lib/styles";

type ProductImageContainerSize = "small" | "medium" | "large";

interface ProductImageProps {
  product: ProductPreviewInfo;
  containerSize?: ProductImageContainerSize;
}

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
        sizes={PRODUCT_IMAGE_SIZES[containerSize]}
        priority={containerSize !== "small"}
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
      />
    </div>
  );
}

export { ProductImage };

import { ProductPreviewInfo } from "@/lib/types/productType";
import Image from "next/image";
function ProductImage({ product }: { product: ProductPreviewInfo }) {
  return (
    <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg">
      <Image
        src={product.thumbnailImage ?? ""}
        alt={product.name}
        fill
        sizes="50vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
export default ProductImage;
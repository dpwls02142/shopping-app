import Image from "next/image";

const ProductDetail = ({ detailImages }: { detailImages: string[] }) => (
  <div className="bg-white">
    <div className="space-y-4">
      {detailImages.map((imageUrl, index) => (
        <div key={index} className="w-full">
          <Image
            src={imageUrl}
            alt={`제품 상세 이미지 ${index + 1}`}
            className="w-full h-auto object-contain"
            width={468}
            height={0}
            priority
          />
        </div>
      ))}
    </div>
  </div>
);

export default ProductDetail;

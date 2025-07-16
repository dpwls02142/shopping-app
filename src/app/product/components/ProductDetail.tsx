import Image from "next/image";

function ProductDetail({ detailImages }: { detailImages: string[] }) {
  return (
    <div className="bg-white">
      <div className="space-y-4">
        {detailImages.map((imageUrl, index) => (
          <div key={index} className="w-full h-auto">
            <Image
              src={imageUrl}
              alt={`제품 상세 이미지 ${index + 1}`}
              width={468}
              height={0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;

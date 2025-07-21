import Image from "next/image";

function ProductDescription({ descriptionImages }: { descriptionImages: string[] }) {
  return (
    <div className="bg-white">
      <div className="space-y-4">
        {descriptionImages.map((imageUrl, index) => (
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

export default ProductDescription;

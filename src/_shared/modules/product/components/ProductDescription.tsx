import Image from "next/image";

interface ProductDescriptionProps {
  descriptionImages: string[];
}

function ProductDescription({ descriptionImages }: ProductDescriptionProps) {
  return (
    <div>
      <div className="space-y-4">
        {descriptionImages.map((imageUrl) => (
          <div
            key={imageUrl}
            className="w-full min-h-[700px] relative overflow-hidden bg-gray-200"
          >
            <Image
              src={imageUrl}
              alt="제품 상세 이미지"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { ProductDescription };

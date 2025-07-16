function ProductCardSkeleton() {
  return (
    <div className="space-y-1">
      <div className="relative w-full aspect-square mb-2 overflow-hidden rounded-lg bg-gray-200">
        <div className="w-full h-full flex items-center justify-center" />
      </div>
      <div className="space-y-1">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="flex items-center space-x-2">
          <div className="h-5 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex items-center text-xs gap-1">
          <div className="h-3 bg-gray-200 rounded w-12"></div>
          <div className="h-3 bg-gray-200 rounded w-8"></div>
        </div>
      </div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <section className="px-4 py-6">
      <div className="mb-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

export default ProductListSkeleton;
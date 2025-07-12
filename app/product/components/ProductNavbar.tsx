"use client";

type ProductNavbarProps = {
  activeTab: "reviews" | "details";
  onTabChange: (tab: "reviews" | "details") => void;
};

const ProductNavbar = ({ activeTab, onTabChange }: ProductNavbarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex">
        <button
          onClick={() => onTabChange("reviews")}
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "reviews"
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          리뷰
        </button>
        <button
          onClick={() => onTabChange("details")}
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "details"
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          상품정보
        </button>
      </div>
    </div>
  );
};

export default ProductNavbar;

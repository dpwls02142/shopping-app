"use client";

import { cn } from "@/lib/utils";

import {
  NAV_CONTAINER,
  TAB_BUTTON_ACTIVE,
  TAB_BUTTON_BASE,
  TAB_BUTTON_INACTIVE,
} from "@/lib/styles";

type ProductTabType = "reviews" | "details";

interface ProductTabProps {
  activeTab: ProductTabType;
  onTabChange: (tab: ProductTabType) => void;
  isVisible: boolean;
}

function ProductTab({ activeTab, onTabChange, isVisible }: ProductTabProps) {
  const topStyle = isVisible ? "top-[60px]" : "top-0";
  return (
    <div className={cn(NAV_CONTAINER, topStyle)}>
      <div className="flex">
        <button
          onClick={() => onTabChange("reviews")}
          className={`${TAB_BUTTON_BASE} ${
            activeTab === "reviews" ? TAB_BUTTON_ACTIVE : TAB_BUTTON_INACTIVE
          }`}
        >
          리뷰
        </button>
        <button
          onClick={() => onTabChange("details")}
          className={`${TAB_BUTTON_BASE} ${
            activeTab === "details" ? TAB_BUTTON_ACTIVE : TAB_BUTTON_INACTIVE
          }`}
        >
          상품정보
        </button>
      </div>
    </div>
  );
}

export default ProductTab;

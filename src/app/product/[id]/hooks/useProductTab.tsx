"use client";

import { useEffect, useState } from "react";

type ProductTabType = "reviews" | "details";
interface UseProductTabReturn {
  activeTab: ProductTabType;
  setActiveTab: (tab: ProductTabType) => void;
  isVisible: boolean;
}
  activeTab: ProductTabType;
  setActiveTab: (tab: ProductTabType) => void;
  isVisible: boolean;
}

const useProductTab = (): UseProductTabProps => {
  const [activeTab, setActiveTab] = useState<ProductTabType>("reviews");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    activeTab,
    setActiveTab,
    isVisible,
  };
};

export { useProductTab };

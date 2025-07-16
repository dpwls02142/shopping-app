"use client";

import { useEffect, useState } from "react";

type UseProductTabReturn = {
  activeTab: "reviews" | "details";
  setActiveTab: (tab: "reviews" | "details") => void;
  isVisible: boolean;
};

const useProductTab = (): UseProductTabReturn => {
  const [activeTab, setActiveTab] = useState<"reviews" | "details">("reviews");
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

export default useProductTab;

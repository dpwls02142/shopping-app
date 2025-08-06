"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function useNavigation() {
  const [canShowBackButton, setCanShowBackButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const entryPage = sessionStorage.getItem("entry-page");
    const currentPageCount = parseInt(
      sessionStorage.getItem("page-count") || "0"
    );

    if (!entryPage) {
      // 첫 진입
      sessionStorage.setItem("entry-page", pathname);
      sessionStorage.setItem("page-count", "1");
      setCanShowBackButton(false);
    } else {
      // 첫 진입이 아니라면 page count 증가
      const newPageCount = currentPageCount + 1;
      sessionStorage.setItem("page-count", newPageCount.toString());

      if (pathname === entryPage) setCanShowBackButton(false);
      else setCanShowBackButton(newPageCount >= 2);
    }
  }, [pathname]);

  return { canShowBackButton };
}

export { useNavigation };

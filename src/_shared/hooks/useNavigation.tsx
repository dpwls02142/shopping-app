"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function useNavigation() {
  const [canShowBackButton, setCanShowBackButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const entryPage = sessionStorage.getItem("entry-page");

    if (!entryPage) {
      sessionStorage.setItem("entry-page", pathname);
      sessionStorage.setItem("page-count", "1");
      setCanShowBackButton(false);
    } else {
      const pageCount = parseInt(sessionStorage.getItem("page-count") || "1");
      sessionStorage.setItem("page-count", (pageCount + 1).toString());
      if (pathname === entryPage) {
        setCanShowBackButton(false);
      } else {
        // 다른 페이지이고 2번째 이상 방문인 경우
        setCanShowBackButton(pageCount >= 2);
      }
    }
  }, [pathname]);

  return { canShowBackButton };
}

export { useNavigation };

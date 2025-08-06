"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ENTRY_PAGE_KEY = "entry-page";

function useNavigation() {
  const [canShowBackButton, setCanShowBackButton] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const entryPage = sessionStorage.getItem(ENTRY_PAGE_KEY);
    if (!entryPage) {
      sessionStorage.setItem(ENTRY_PAGE_KEY, pathname);
      setCanShowBackButton(false);
    } else {
      setCanShowBackButton(pathname !== entryPage);
    }
  }, [pathname]);

  return { canShowBackButton };
}

export { useNavigation };

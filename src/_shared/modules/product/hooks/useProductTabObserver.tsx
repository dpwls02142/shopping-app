import { useEffect } from "react";

type ProductTabType = "reviews" | "details";

interface UseProductTabObserverProps {
  reviewRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
  setActiveTab: (tab: ProductTabType) => void;
}

const ROOT_MARGIN = "0px 0px -10% 0px";
const INTERSECTION_THRESHOLD = 0.1;

const useProductTabObserver = ({
  reviewRef,
  descriptionRef,
  setActiveTab,
}: UseProductTabObserverProps) => {
  useEffect(() => {
    const reviewEl = reviewRef.current;
    const descriptionEl = descriptionRef.current;
    if (!reviewEl || !descriptionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;
        const mostVisible = visibleEntries.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        );
        if (mostVisible.target === reviewEl) {
          setActiveTab("reviews");
        } else if (mostVisible.target === descriptionEl) {
          setActiveTab("details");
        }
      },
      {
        rootMargin: ROOT_MARGIN,
        threshold: INTERSECTION_THRESHOLD,
      }
    );

    observer.observe(reviewEl);
    observer.observe(descriptionEl);

    return () => observer.disconnect();
  }, [reviewRef, descriptionRef, setActiveTab]);
};

export { useProductTabObserver };

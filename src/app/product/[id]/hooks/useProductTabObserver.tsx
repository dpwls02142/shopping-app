import { useEffect } from "react";

type Props = {
  reviewRef: React.RefObject<HTMLDivElement | null>;
  descriptionRef: React.RefObject<HTMLDivElement | null>;
  setActiveTab: (tab: "reviews" | "details") => void;
};

const useProductTabObserver = ({
  reviewRef,
  descriptionRef,
  setActiveTab,
}: Props) => {
  useEffect(() => {
    const reviewEl = reviewRef.current;
    const descriptionEl = descriptionRef.current;
    if (!reviewEl || !descriptionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            if (entry.target === reviewEl) {
              setActiveTab("reviews");
            } else if (entry.target === descriptionEl) {
              setActiveTab("details");
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -30% 0px",
        threshold: 0.3,
      }
    );

    observer.observe(reviewEl);
    observer.observe(descriptionEl);

    return () => observer.disconnect();
  }, [reviewRef, descriptionRef, setActiveTab]);
};

export default useProductTabObserver;

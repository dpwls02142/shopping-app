"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 z-50 flex items-center justify-center"
      aria-label="뒤로가기"
    >
      <ArrowLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default BackButton;

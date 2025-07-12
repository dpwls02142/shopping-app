import { useAppNavigation } from "@/app/hooks/useAppNavigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const { goBack } = useAppNavigation();

  return (
    <button
      onClick={goBack}
      className="absolute top-4 left-4 z-50 flex items-center justify-center"
      aria-label="뒤로가기"
    >
      <ArrowLeft className="w-5 h-5 text-gray-700" />
    </button>
  );
};

export default BackButton;

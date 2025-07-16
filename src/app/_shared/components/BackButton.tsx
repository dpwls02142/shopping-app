import { BACK_BUTTON, ICON } from "@/lib/styles";
import { ArrowLeft } from "lucide-react";

import { useAppNavigation } from "@/app/_shared/hooks/useAppNavigation";

function BackButton() {
  const { goBack } = useAppNavigation();

  return (
    <button onClick={goBack} className={BACK_BUTTON} aria-label="뒤로가기">
      <ArrowLeft className={ICON} />
    </button>
  );
}

export default BackButton;

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";
import { PersonalizedProductList } from "@/_shared/modules/product/components/PersonalizedProductList";

export default function HomePage() {
  return (
    <AppSwipeNavbar>
      <PersonalizedProductList />
    </AppSwipeNavbar>
  );
}

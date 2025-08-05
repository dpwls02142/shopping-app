import { PersonalizedProductList } from "@/_shared/modules/product/components/PersonalizedProductList";
import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";

export default function HomePage() {
  return (
    <AppSwipeNavbar>
      <PersonalizedProductList />
    </AppSwipeNavbar>
  );
}

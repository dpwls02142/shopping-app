import type { Metadata } from "next";

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";
import { PersonalizedProductList } from "@/_shared/modules/product/components/PersonalizedProductList";

export const metadata: Metadata = {
  title: `쇼핑몰 홈`,
};

function HomePage() {
  return (
    <AppSwipeNavbar>
      <PersonalizedProductList />
    </AppSwipeNavbar>
  );
}

export default HomePage;

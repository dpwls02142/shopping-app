import type { Metadata } from "next";

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";
import { PersonalizedProductList } from "@/_shared/modules/product/components/PersonalizedProductList";
import { fetchCustomers } from "@/lib/api/customerApi";

export async function generateMetadata(): Promise<Metadata> {
  const customers = await fetchCustomers();
  const name = customers[0]?.name || "고객";

  return {
    title: `쇼핑몰`,
    openGraph: {
      title: `${name}님을 위한 추천 상품`,
      description: `${name}님을 위한 추천 상품을 만나보세요.`,
      images: [
        `https://shopping-app-ivory.vercel.app/api/og?name=${encodeURIComponent(name)}`,
      ],
    },
  };
}

function HomePage() {
  return (
    <AppSwipeNavbar>
      <PersonalizedProductList />
    </AppSwipeNavbar>
  );
}

export default HomePage;

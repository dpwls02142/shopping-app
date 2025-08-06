import type { Metadata } from "next";

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";
import { DealView } from "@/_shared/modules/deal/components/DealView";

import { fetchCustomers } from "@/lib/api/customerApi";

interface DealsPageProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const customers = await fetchCustomers();
  const name = customers[0]?.name || "고객";

  return {
    title: `특가 상품`,
    openGraph: {
      title: `${name}님을 위한 특가 상품`,
      description: `${name}님을 위한 특가 상품을 만나보세요.`,
      images: [
        `https://shopping-app-ivory.vercel.app/api/og?name=${encodeURIComponent(name)}`,
      ],
    },
  };
}

async function DealsPage({ searchParams }: DealsPageProps) {
  const params = await searchParams;
  const { view } = params;

  return (
    <AppSwipeNavbar>
      <DealView searchParams={{ view }} />
    </AppSwipeNavbar>
  );
}

export default DealsPage;

import type { Metadata } from "next";

import { AppSwipeNavbar } from "@/_shared/components/AppSwipeNavbar";
import { DealView } from "@/_shared/modules/deal/components/DealView";

interface DealsPageProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

export const metadata: Metadata = {
  title: `특가 상품`,
};

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
import { BrandProductList } from "@/_shared/modules/deal/components/BrandProductList";
import { DailyProductList } from "@/_shared/modules/deal/components/DailyProductList";
import { DealNavbar } from "@/_shared/modules/deal/components/DealNavbar";

interface DealViewProps {
  searchParams: {
    view?: string;
  };
}

function DealView({ searchParams }: DealViewProps) {
  const view = searchParams.view;

  return (
    <div>
      <DealNavbar />
      <section>
        {view === "brand" ? <BrandProductList /> : <DailyProductList />}
      </section>
    </div>
  );
}

export { DealView };

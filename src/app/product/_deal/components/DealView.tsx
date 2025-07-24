import { BrandProductList } from "@/app/product/_deal/components/BrandProductList";
import { DailyProductList } from "@/app/product/_deal/components/DailyProductList";
import { DealNavbar } from "@/app/product/_deal/components/DealNavbar";

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

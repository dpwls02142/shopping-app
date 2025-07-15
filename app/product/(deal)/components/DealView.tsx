import BrandProductList from "@/app/(deal)/components/BrandProductList";
import DailyProductList from "@/app/(deal)/components/DailyProductList";
import DealNavbar from "@/app/(deal)/components/DealNavbar";

type DealViewProps = {
  searchParams: {
    view?: string;
  };
};

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

export default DealView;

import BrandProducts from "@/app/(deal)/components/BrandProducts";
import DailyProducts from "@/app/(deal)/components/DailyProducts";
import DealNavbar from "@/app/(deal)/components/DealNavbar";

type DealViewProps = {
  searchParams: {
    view?: string;
  };
};

const DealView = ({ searchParams }: DealViewProps) => {
  const view = searchParams.view;

  return (
    <div>
      <DealNavbar />
      <section>
        {view === "brand" ? <BrandProducts /> : <DailyProducts />}
      </section>
    </div>
  );
};

export default DealView;

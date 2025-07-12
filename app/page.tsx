import DealView from "@/app/(deal)/components/DealView";
import DailyProducts from "@/app/(deal)/components/DailyProducts";
import MainView from "@/app/components/MainView";
import PersonalizedProduct from "@/app/components/PersonalizedProduct";

type Props = {
  searchParams: {
    tab?: string;
    view?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const { tab, view } = await searchParams;
  if (tab === "deal") {
    return <DealView searchParams={{ view }} />;
  }
  return (
    <MainView shoppingHome={<PersonalizedProduct />} deal={<DailyProducts />} />
  );
}

import MainView from "@/app/_shared/components/MainView";
import DealView from "@/app/product/(deal)/components/DealView";
import PersonalizedProduct from "@/app/product/components/PersonalizedProduct";

type Props = {
  searchParams: Promise<{
    tab?: string;
    view?: string;
  }>;
};

async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const { view } = params;

  return (
    <MainView
      shoppingHome={<PersonalizedProduct />}
      deal={<DealView searchParams={{ view }} />}
    />
  );
}

export default Home;

import DealView from "@/app/(deal)/components/DealView";
import MainView from "@/app/components/MainView";
import PersonalizedProduct from "@/app/components/PersonalizedProduct";

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

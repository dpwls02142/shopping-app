import MainView from "@/app/(main)/components/MainView";
import PersonalizedProduct from "@/app/(main)/components/PersonalizedProduct";
import DealView from "@/app/(main)/deal/components/DealView";

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

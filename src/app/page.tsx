import MainView from "@/app/_shared/components/MainView";
import DealView from "@/app/product/_deal/components/DealView";
import PersonalizedProductList from "@/app/product/components/PersonalizedProductList";

interface HomeProps {
  searchParams: Promise<{
    tab?: string;
    view?: string;
  }>;
};

async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const { view } = params;

  return (
    <MainView
      shoppingHome={<PersonalizedProductList />}
      deal={<DealView searchParams={{ view }} />}
    />
  );
}

export default Home;

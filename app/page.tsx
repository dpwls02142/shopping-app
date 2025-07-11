import PersonalizedProductList from "@/app/components/PersonalizedProductList";
import DailyProducts from "@/app/(deal)/components/DailyProducts";
import MainView from "@/app/components/MainView";

export default function Home() {
  return (
    <MainView
      shoppingHome={<PersonalizedProductList />}
      deal={<DailyProducts />}
    />
  );
}

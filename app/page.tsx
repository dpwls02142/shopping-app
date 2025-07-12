import DailyProducts from "@/app/(deal)/components/DailyProducts";
import MainView from "@/app/components/MainView";
import PersonalizedProduct from "@/app/components/PersonalizedProduct";

export default function Home() {
  return (
    <MainView shoppingHome={<PersonalizedProduct />} deal={<DailyProducts />} />
  );
}

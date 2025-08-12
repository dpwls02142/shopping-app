import { Metadata } from "next";

import { CartView } from "@/_shared/modules/cart/components/CartView";

import { fetchCustomers } from "@/lib/api/customerApi";

export async function generateMetadata(): Promise<Metadata> {
  const customers = await fetchCustomers();
  const name = customers[0]?.name || "고객";

  return {
    title: `장바구니`,
    description: `장바구니`,
    openGraph: {
      title: `${name}님의 장바구니`,
      description: `${name}님의 장바구니를 확인해보세요.`,
      images: [
        `https://shopping-app-ivory.vercel.app/api/og?name=${encodeURIComponent(name)}`,
      ],
    },
  };
}

function CartPage() {
  return <CartView />;
}

export default CartPage;

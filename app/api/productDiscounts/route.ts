import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    // productId가 없으면 전체 데이터 반환
    if (!productId) {
      return NextResponse.json(dbData.productDiscounts);
    }

    const discounts = dbData.productDiscounts.filter(
      (discount) => discount.productId === productId
    );

    return NextResponse.json(discounts);
  } catch (error) {
    console.error("Error fetching product discounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch product discounts" },
      { status: 500 }
    );
  }
}

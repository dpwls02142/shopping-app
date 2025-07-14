import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.productDiscounts);
  } catch (error) {
    console.error("Error fetching product discounts:", error);
    return NextResponse.json(
      { error: "Failed to fetch product discounts" },
      { status: 500 }
    );
  }
}

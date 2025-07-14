import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

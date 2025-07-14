import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.productInventories);
  } catch (error) {
    console.error("Error fetching product inventories:", error);
    return NextResponse.json(
      { error: "Failed to fetch product inventories" },
      { status: 500 }
    );
  }
}

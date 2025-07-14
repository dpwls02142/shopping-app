import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.productOptions);
  } catch (error) {
    console.error("Error fetching product options:", error);
    return NextResponse.json(
      { error: "Failed to fetch product options" },
      { status: 500 }
    );
  }
}

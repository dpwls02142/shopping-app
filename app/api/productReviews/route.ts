import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.reviews);
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch product reviews" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(dbData.reviews);
    }

    const reviews = dbData.reviews.filter(
      (review) => review.productId === productId
    );

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(dbData.productImages);
    }

    const images = dbData.productImages.filter(
      (image) => image.productId === productId
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching product images:", error);
    return NextResponse.json(
      { error: "Failed to fetch product images" },
      { status: 500 }
    );
  }
}

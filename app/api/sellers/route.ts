import { NextResponse } from "next/server";
import dbData from "@/lib/db/db.json";

export async function GET() {
  try {
    return NextResponse.json(dbData.sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return NextResponse.json(
      { error: "Failed to fetch sellers" },
      { status: 500 }
    );
  }
}

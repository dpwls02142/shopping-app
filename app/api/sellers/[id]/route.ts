import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dbData from "@/lib/db/db.json";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Params) {
  const { id } = await context.params;

  const seller = dbData.sellers.find((s) => s.id === id);

  if (!seller) {
    return NextResponse.json({ error: "Seller not found" }, { status: 404 });
  }

  return NextResponse.json(seller);
}

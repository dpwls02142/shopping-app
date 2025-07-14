import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import dbData from "@/lib/db/db.json";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: Params) {
  const { id } = await context.params;

  const product = dbData.products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

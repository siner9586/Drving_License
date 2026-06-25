import { NextRequest, NextResponse } from "next/server";
import { listBases } from "@/lib/data";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const bases = await listBases(params);
  return NextResponse.json({ data: bases });
}

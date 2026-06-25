import { NextRequest, NextResponse } from "next/server";
import { listPackages } from "@/lib/data";

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const packages = await listPackages(params);
  return NextResponse.json({ data: packages });
}
